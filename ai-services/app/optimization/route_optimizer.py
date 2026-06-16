import numpy as np
from ortools.constraint_solver import pywrapcp, routing_enums_pb2
import networkx as nx
from math import radians, sin, cos, sqrt, atan2


class RouteOptimizer:
    def __init__(self):
        self.earth_radius_km = 6371

    def haversine_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return self.earth_radius_km * c

    def build_distance_matrix(self, locations: list[dict]) -> list[list[int]]:
        n = len(locations)
        matrix = [[0] * n for _ in range(n)]

        for i in range(n):
            for j in range(n):
                if i != j:
                    dist = self.haversine_distance(
                        locations[i]['latitude'], locations[i]['longitude'],
                        locations[j]['latitude'], locations[j]['longitude'],
                    )
                    matrix[i][j] = int(dist * 1000)

        return matrix

    def optimize_tsp(self, locations: list[dict]) -> dict:
        if len(locations) <= 1:
            return {
                "optimizedOrder": list(range(len(locations))),
                "totalDistance": 0,
                "locations": locations,
            }

        distance_matrix = self.build_distance_matrix(locations)

        manager = pywrapcp.RoutingIndexManager(
            len(locations), 1, 0
        )
        routing = pywrapcp.RoutingModel(manager)

        def distance_callback(from_index, to_index):
            from_node = manager.IndexToNode(from_index)
            to_node = manager.IndexToNode(to_index)
            return distance_matrix[from_node][to_node]

        transit_callback_index = routing.RegisterTransitCallback(distance_callback)
        routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        search_parameters.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
        )
        search_parameters.local_search_metaheuristic = (
            routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
        )
        search_parameters.time_limit.seconds = 30

        solution = routing.SolveWithParameters(search_parameters)

        if solution:
            optimized_order = []
            index = routing.Start(0)
            while not routing.IsEnd(index):
                optimized_order.append(manager.IndexToNode(index))
                index = solution.Value(routing.NextVar(index))

            total_distance = solution.ObjectiveValue() / 1000.0

            ordered_locations = [locations[i] for i in optimized_order]

            return {
                "optimizedOrder": optimized_order,
                "totalDistance": round(total_distance, 2),
                "locations": ordered_locations,
            }

        return {
            "optimizedOrder": list(range(len(locations))),
            "totalDistance": sum(
                self.haversine_distance(
                    locations[i]['latitude'], locations[i]['longitude'],
                    locations[(i + 1) % len(locations)]['latitude'],
                    locations[(i + 1) % len(locations)]['longitude'],
                )
                for i in range(len(locations))
            ),
            "locations": locations,
        }

    def optimize_with_networkx(self, locations: list[dict]) -> dict:
        G = nx.Graph()

        for i, loc in enumerate(locations):
            G.add_node(i, **loc)

        for i in range(len(locations)):
            for j in range(i + 1, len(locations)):
                dist = self.haversine_distance(
                    locations[i]['latitude'], locations[i]['longitude'],
                    locations[j]['latitude'], locations[j]['longitude'],
                )
                G.add_edge(i, j, weight=dist)

        try:
            cycle = nx.approximation.traveling_salesman_problem(G, cycle=True)
            total_distance = sum(
                G[cycle[i]][cycle[i + 1]]['weight']
                for i in range(len(cycle) - 1)
            )

            return {
                "optimizedOrder": cycle,
                "totalDistance": round(total_distance, 2),
                "locations": [locations[i] for i in cycle],
            }
        except Exception:
            return self.optimize_tsp(locations)
