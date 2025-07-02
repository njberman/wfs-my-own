When writing a rules file, the order is top, right, bottom, left.

structure of the rules file:
big array:
    for each image, an array of which colors are on top, right, bottom, left. 3 pixels essentially on each side.
        for each side, the order is clockwise, so for top it goes left to right, but for bottom it goes right to left etc

for the circuits:
- Black: 0
- Grey: 1
- Green: 2
- Light Green: 3
