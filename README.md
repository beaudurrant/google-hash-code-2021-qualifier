# Google Hash Code 2021 Qualifer
"Traffic signaling"

[Problem statement](hashcode_2021_online_qualifications.pdf)

## Usage

```sh
npm start
```

## Strategy

1. Create verticies from edges
2. Traverse paths find the total intersections (Ti) and edge intersections (Ei) at each vertex
3. Calculate cycle per edge at each intersection; cycle = floor(Ti / (Ti - Ei))

* This doesn't provide the optimal solution for every case, it's a greedy algorithm that works well for all cases

## Scores

* A – An example - 2,000
* B – By the ocean - 4,565,706
* C – Checkmate - 1,294,235
* D – Daily commute - 1,580,662
* E – Etoile - 697,390 
* F – Forever jammed - 1,285,348

Total Score: 9,425,341

## License (MIT)

[MIT](LICENSE)