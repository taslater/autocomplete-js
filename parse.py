import json

with open('./words.txt') as file:
    lines = file.readlines()
    lines = [line.rstrip() for line in lines]


class Tree:
    def __init__(self):
        self.data = {}

    def add(self, word):
        layer = self.data
        for char in word:
            if char not in layer.keys():
                layer[char] = {}
            layer = layer[char]


tree = Tree()
for word in lines:
    tree.add(word.lower())

with open("wordTree.js", "w") as outfile:
    outfile.write("const wordTree = ")
    json.dump(tree.data, outfile)
