"use strict";

const speed = 3;
const ray_num = 60;
const check = 120;
const divider = 4;
const adder = 1/divider;
const checkMultiplyer = 3;
const RGBmultiplyer = 1.3;
const resMult = 0.1;
var fullScr = true;

const grid = 500;
const square = 50;

const texWall = 
[[[45, 31, 22], [42, 31, 25], [39, 31, 29], [38, 33, 30], [44, 31, 25], [45, 31, 22], [45, 31, 22], [44, 31, 23], [41, 32, 25], [41, 32, 25], [45, 32, 24], [44, 31, 23], [41, 32, 25], [41, 32, 25], [42, 32, 23], [44, 31, 22], [45, 31, 22], [42, 31, 25], [39, 31, 29], [38, 33, 30], [44, 31, 25], [45, 31, 22], [45, 31, 22], [44, 31, 23], [41, 32, 25], [41, 32, 25], [45, 32, 24], [44, 31, 23], [41, 32, 25], [41, 32, 25], [42, 32, 23], [44, 31, 22]], [[162, 144, 132], [158, 144, 135], [41, 31, 29], [70, 61, 56], [159, 145, 136], [162, 144, 132], [161, 144, 134], [159, 145, 136], [156, 146, 137], [42, 32, 23], [159, 145, 134], [160, 146, 135], [156, 146, 137], [42, 32, 23], [159, 145, 134], [162, 146, 133], [161, 145, 132], [158, 144, 135], [41, 31, 29], [70, 61, 56], [159, 145, 136], [162, 144, 132], [161, 144, 134], [159, 145, 136], [156, 146, 137], [42, 32, 23], [159, 145, 134], [160, 146, 135], [156, 146, 137], [42, 32, 23], [159, 145, 134], [162, 146, 133]], [[166, 143, 127], [163, 144, 129], [44, 31, 22], [159, 145, 136], [163, 144, 130], [166, 143, 127], [165, 143, 129], [162, 144, 132], [159, 145, 136], [45, 31, 20], [162, 145, 129], [162, 145, 129], [159, 145, 134], [45, 31, 20], [163, 144, 129], [165, 144, 127], [165, 144, 127], [163, 144, 129], [44, 31, 22], [159, 145, 136], [163, 144, 130], [166, 143, 127], [165, 143, 129], [162, 144, 132], [159, 145, 136], [45, 31, 20], [162, 145, 129], [162, 145, 129], [159, 145, 134], [45, 31, 20], [163, 144, 129], [165, 144, 127]], [[211, 188, 172], [211, 189, 175], [45, 31, 22], [206, 192, 181], [211, 189, 176], [212, 189, 175], [212, 188, 176], [78, 58, 47], [205, 191, 182], [45, 31, 22], [209, 190, 176], [210, 191, 177], [205, 191, 182], [45, 31, 22], [211, 189, 176], [212, 189, 173], [211, 188, 172], [211, 189, 175], [45, 31, 22], [206, 192, 181], [211, 189, 176], [212, 189, 175], [212, 188, 176], [78, 58, 47], [205, 191, 182], [45, 31, 22], [209, 190, 176], [210, 191, 177], [205, 191, 182], [45, 31, 22], [211, 189, 176], [212, 189, 173]], [[116, 93, 85], [113, 94, 87], [44, 31, 25], [109, 96, 90], [112, 93, 86], [114, 94, 85], [114, 94, 87], [113, 94, 88], [109, 96, 90], [44, 31, 25], [113, 94, 88], [113, 94, 88], [109, 96, 90], [44, 31, 25], [113, 94, 88], [116, 93, 87], [116, 93, 85], [113, 94, 87], [44, 31, 25], [109, 96, 90], [112, 93, 86], [114, 94, 85], [114, 94, 87], [113, 94, 88], [109, 96, 90], [44, 31, 25], [113, 94, 88], [113, 94, 88], [109, 96, 90], [44, 31, 25], [113, 94, 88], [116, 93, 87]], [[76, 58, 54], [74, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [74, 59, 56], [71, 60, 58], [41, 31, 29], [74, 59, 56], [74, 59, 56], [70, 60, 58], [41, 31, 29], [74, 59, 56], [76, 58, 56], [76, 58, 54], [74, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [74, 59, 56], [71, 60, 58], [41, 31, 29], [74, 59, 56], [74, 59, 56], [70, 60, 58], [41, 31, 29], [74, 59, 56], [76, 58, 56]], [[70, 60, 58], [69, 61, 58], [38, 33, 30], [67, 62, 59], [69, 61, 59], [40, 32, 30], [70, 60, 59], [70, 60, 59], [70, 62, 60], [38, 33, 30], [70, 60, 59], [70, 60, 59], [36, 32, 31], [37, 33, 32], [70, 60, 59], [71, 59, 59], [70, 60, 58], [69, 61, 58], [38, 33, 30], [67, 62, 59], [69, 61, 59], [40, 32, 30], [70, 60, 59], [70, 60, 59], [70, 62, 60], [38, 33, 30], [70, 60, 59], [70, 60, 59], [36, 32, 31], [37, 33, 32], [70, 60, 59], [71, 59, 59]], [[40, 32, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [37, 32, 29], [37, 32, 29], [41, 31, 30], [41, 31, 30], [40, 32, 30], [41, 33, 31], [40, 32, 30], [40, 32, 30], [38, 32, 32], [38, 33, 30], [42, 32, 31], [41, 31, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [37, 32, 29], [37, 32, 29], [41, 31, 30], [41, 31, 30], [40, 32, 30], [41, 33, 31], [40, 32, 30], [40, 32, 30], [38, 32, 32], [38, 33, 30], [42, 32, 31], [42, 30, 30]], [[107, 96, 94], [44, 30, 27], [111, 93, 91], [110, 95, 92], [42, 31, 29], [105, 95, 93], [110, 95, 92], [112, 94, 92], [110, 95, 90], [110, 96, 93], [107, 96, 94], [42, 31, 29], [109, 95, 92], [110, 95, 92], [112, 94, 92], [110, 95, 92], [109, 95, 92], [44, 30, 27], [111, 93, 91], [110, 95, 92], [42, 31, 29], [105, 95, 93], [110, 95, 92], [112, 94, 92], [110, 95, 90], [110, 96, 93], [107, 96, 94], [42, 31, 29], [109, 95, 92], [110, 95, 92], [112, 94, 92], [112, 94, 92]], [[71, 60, 58], [73, 59, 56], [76, 58, 56], [76, 58, 56], [41, 30, 28], [70, 60, 58], [74, 59, 56], [76, 58, 56], [76, 58, 54], [73, 59, 56], [70, 60, 58], [42, 31, 29], [74, 59, 56], [75, 57, 53], [76, 58, 56], [74, 59, 56], [73, 59, 56], [73, 59, 56], [76, 58, 56], [76, 58, 56], [41, 30, 28], [70, 60, 58], [74, 59, 56], [76, 58, 56], [76, 58, 54], [73, 59, 56], [70, 60, 58], [42, 31, 29], [74, 59, 56], [75, 57, 53], [76, 58, 56], [76, 58, 56]], [[69, 61, 59], [69, 61, 59], [71, 59, 59], [70, 60, 59], [40, 32, 30], [67, 62, 59], [70, 60, 61], [70, 60, 59], [70, 60, 58], [69, 61, 58], [69, 61, 59], [40, 32, 30], [70, 60, 59], [41, 31, 30], [71, 59, 59], [70, 60, 59], [69, 61, 59], [69, 61, 59], [71, 59, 59], [70, 60, 59], [40, 32, 30], [67, 62, 59], [70, 60, 61], [70, 60, 59], [70, 60, 58], [69, 61, 58], [69, 61, 59], [40, 32, 30], [70, 60, 59], [41, 31, 30], [71, 59, 59], [71, 59, 59]], [[41, 31, 29], [41, 31, 29], [42, 30, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [39, 30, 31], [40, 31, 32], [41, 31, 30], [40, 30, 28], [41, 31, 30], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 31, 32], [40, 32, 30], [40, 32, 30], [41, 31, 29], [42, 30, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [39, 30, 31], [40, 31, 32], [41, 31, 30], [40, 30, 28], [41, 31, 30], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 31, 32], [38, 32, 32]], [[110, 95, 90], [110, 95, 90], [112, 94, 92], [112, 94, 92], [110, 95, 90], [110, 96, 93], [107, 95, 95], [42, 30, 30], [109, 95, 92], [111, 96, 91], [112, 94, 92], [112, 94, 92], [109, 94, 91], [109, 95, 94], [38, 33, 30], [38, 33, 30], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92], [110, 95, 90], [110, 96, 93], [107, 95, 95], [42, 30, 30], [109, 95, 92], [111, 96, 91], [112, 94, 92], [112, 94, 92], [109, 94, 91], [109, 95, 94], [38, 33, 30], [37, 33, 32]], [[74, 59, 54], [74, 59, 54], [77, 59, 57], [76, 58, 56], [74, 59, 54], [73, 59, 56], [70, 60, 58], [41, 31, 29], [73, 59, 56], [74, 59, 54], [76, 58, 56], [76, 58, 56], [76, 58, 56], [71, 60, 58], [38, 33, 30], [67, 62, 59], [73, 59, 56], [74, 59, 54], [77, 59, 57], [76, 58, 56], [74, 59, 54], [73, 59, 56], [70, 60, 58], [41, 31, 29], [73, 59, 56], [74, 59, 54], [76, 58, 56], [76, 58, 56], [76, 58, 56], [71, 60, 58], [38, 33, 30], [64, 63, 61]], [[70, 60, 58], [70, 60, 58], [69, 61, 59], [41, 33, 31], [70, 60, 58], [69, 61, 58], [67, 62, 59], [38, 33, 30], [69, 61, 59], [70, 60, 59], [70, 58, 58], [70, 60, 59], [70, 60, 58], [69, 61, 59], [38, 32, 32], [65, 61, 58], [69, 61, 59], [70, 60, 58], [69, 61, 59], [41, 33, 31], [70, 60, 58], [69, 61, 58], [67, 62, 59], [38, 33, 30], [69, 61, 59], [70, 60, 59], [70, 58, 58], [70, 60, 59], [70, 60, 58], [69, 61, 59], [38, 32, 32], [65, 61, 60]], [[41, 31, 29], [40, 32, 29], [38, 33, 30], [38, 33, 30], [39, 31, 28], [42, 32, 30], [40, 32, 30], [40, 32, 30], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30], [41, 31, 29], [40, 32, 29], [38, 33, 30], [38, 33, 30], [39, 31, 28], [42, 32, 30], [40, 32, 30], [40, 32, 30], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30]], [[110, 95, 88], [109, 96, 90], [41, 31, 29], [106, 96, 94], [109, 95, 92], [110, 95, 90], [112, 94, 92], [113, 95, 93], [110, 95, 92], [109, 95, 92], [42, 31, 29], [107, 96, 94], [109, 95, 92], [110, 95, 90], [112, 94, 92], [113, 95, 93], [110, 95, 90], [109, 96, 90], [41, 31, 29], [106, 96, 94], [109, 95, 92], [110, 95, 90], [112, 94, 92], [113, 95, 93], [110, 95, 92], [109, 95, 92], [42, 31, 29], [107, 96, 94], [109, 95, 92], [110, 95, 90], [112, 94, 92], [113, 95, 93]], [[74, 59, 54], [73, 60, 54], [41, 31, 29], [70, 60, 58], [72, 58, 55], [74, 59, 54], [76, 58, 56], [76, 58, 56], [74, 59, 56], [73, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [76, 58, 56], [76, 58, 54], [73, 60, 54], [41, 31, 29], [70, 60, 58], [72, 58, 55], [74, 59, 54], [76, 58, 56], [76, 58, 56], [74, 59, 56], [73, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [76, 58, 56]], [[70, 60, 59], [69, 61, 59], [38, 33, 30], [67, 62, 59], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [40, 32, 30], [69, 61, 59], [38, 33, 30], [66, 61, 58], [40, 32, 30], [69, 61, 59], [70, 60, 59], [70, 60, 59], [70, 60, 59], [69, 61, 59], [38, 33, 30], [67, 62, 59], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [40, 32, 30], [69, 61, 59], [38, 33, 30], [66, 61, 58], [40, 32, 30], [69, 61, 59], [70, 60, 59], [71, 59, 59]], [[41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [41, 31, 30], [41, 31, 30], [41, 33, 31], [40, 32, 30], [40, 32, 30], [40, 32, 30], [38, 32, 32], [38, 32, 32], [41, 31, 30], [41, 31, 30], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [40, 32, 30], [41, 31, 30], [41, 31, 30], [41, 33, 31], [40, 32, 30], [40, 32, 30], [40, 32, 30], [38, 32, 32], [38, 32, 32], [41, 31, 30], [42, 30, 30]], [[111, 96, 93], [110, 95, 92], [112, 94, 92], [110, 95, 92], [107, 96, 94], [42, 31, 29], [110, 95, 92], [112, 94, 92], [110, 95, 90], [110, 95, 90], [112, 94, 92], [110, 94, 94], [106, 96, 95], [41, 31, 30], [110, 94, 94], [112, 94, 92], [113, 95, 93], [110, 95, 92], [112, 94, 92], [110, 95, 92], [107, 96, 94], [42, 31, 29], [110, 95, 92], [112, 94, 92], [110, 95, 90], [110, 95, 90], [112, 94, 92], [110, 94, 94], [106, 96, 95], [41, 31, 30], [110, 94, 94], [112, 94, 92]], [[75, 60, 57], [74, 59, 56], [76, 58, 56], [74, 59, 56], [70, 60, 58], [41, 31, 29], [74, 59, 56], [76, 58, 56], [74, 59, 54], [74, 59, 54], [76, 58, 56], [74, 58, 58], [71, 59, 59], [41, 31, 30], [74, 58, 58], [76, 58, 56], [77, 59, 57], [74, 59, 56], [76, 58, 56], [74, 59, 56], [70, 60, 58], [41, 31, 29], [74, 59, 56], [76, 58, 56], [74, 59, 54], [74, 59, 54], [76, 58, 56], [74, 58, 58], [71, 59, 59], [41, 31, 30], [74, 58, 58], [76, 58, 56]], [[70, 60, 58], [70, 60, 58], [70, 60, 59], [40, 32, 30], [67, 62, 59], [38, 33, 30], [69, 61, 59], [40, 32, 30], [70, 60, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [69, 60, 61], [38, 32, 32], [70, 60, 59], [70, 60, 59], [70, 60, 58], [70, 60, 58], [70, 60, 59], [40, 32, 30], [67, 62, 59], [38, 33, 30], [69, 61, 59], [40, 32, 30], [70, 60, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [69, 60, 61], [38, 32, 32], [70, 60, 59], [71, 59, 59]], [[41, 31, 29], [41, 31, 29], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [38, 33, 30], [38, 33, 30], [40, 32, 29], [41, 31, 29], [42, 30, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [40, 31, 32], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [38, 33, 30], [38, 33, 30], [40, 32, 29], [41, 31, 29], [42, 30, 30], [41, 31, 30], [40, 32, 30], [40, 32, 30], [40, 31, 32], [38, 32, 32]], [[110, 95, 90], [110, 95, 90], [112, 94, 92], [112, 94, 92], [110, 95, 90], [109, 95, 92], [106, 96, 94], [41, 31, 29], [109, 95, 92], [110, 95, 90], [112, 94, 92], [111, 93, 91], [110, 95, 90], [110, 96, 93], [40, 32, 30], [39, 31, 29], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92], [110, 95, 90], [109, 95, 92], [106, 96, 94], [41, 31, 29], [109, 95, 92], [110, 95, 90], [112, 94, 92], [111, 93, 91], [110, 95, 90], [110, 96, 93], [40, 32, 30], [36, 32, 31]], [[74, 59, 54], [74, 59, 54], [76, 58, 56], [76, 58, 56], [74, 59, 54], [73, 59, 56], [70, 60, 58], [41, 31, 29], [73, 59, 56], [75, 60, 55], [76, 58, 56], [76, 58, 56], [76, 58, 54], [73, 59, 56], [40, 32, 30], [69, 61, 59], [73, 59, 56], [74, 59, 54], [76, 58, 56], [76, 58, 56], [74, 59, 54], [73, 59, 56], [70, 60, 58], [41, 31, 29], [73, 59, 56], [75, 60, 55], [76, 58, 56], [76, 58, 56], [76, 58, 54], [73, 59, 56], [40, 32, 30], [66, 62, 61]], [[70, 60, 58], [70, 60, 58], [69, 61, 59], [39, 31, 29], [70, 60, 58], [69, 61, 58], [67, 62, 59], [38, 33, 30], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [70, 60, 58], [70, 62, 59], [38, 32, 32], [68, 63, 60], [69, 61, 59], [70, 60, 58], [69, 61, 59], [39, 31, 29], [70, 60, 58], [69, 61, 58], [67, 62, 59], [38, 33, 30], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [70, 60, 58], [70, 62, 59], [38, 32, 32], [68, 62, 62]], [[41, 31, 29], [40, 32, 29], [38, 33, 30], [38, 33, 30], [40, 32, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [41, 31, 30], [41, 31, 30], [41, 31, 29], [40, 32, 29], [38, 33, 30], [38, 33, 30], [40, 32, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [40, 32, 30], [40, 32, 30], [41, 31, 29], [41, 31, 29], [41, 31, 30], [41, 31, 30]], [[110, 95, 90], [110, 96, 93], [41, 31, 29], [107, 97, 95], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92], [111, 96, 91], [109, 96, 90], [42, 31, 29], [108, 97, 95], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92], [110, 95, 90], [110, 96, 93], [41, 31, 29], [107, 97, 95], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92], [111, 96, 91], [109, 96, 90], [42, 31, 29], [108, 97, 95], [109, 95, 92], [110, 95, 90], [112, 94, 92], [112, 94, 92]], [[73, 58, 53], [73, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [75, 60, 55], [76, 58, 56], [76, 58, 56], [74, 59, 54], [73, 60, 54], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [75, 57, 55], [75, 57, 53], [73, 59, 56], [41, 31, 29], [70, 60, 58], [73, 59, 56], [75, 60, 55], [76, 58, 56], [76, 58, 56], [74, 59, 54], [73, 60, 54], [41, 31, 29], [70, 60, 58], [73, 59, 56], [74, 59, 54], [76, 58, 56], [75, 57, 55]], [[70, 60, 58], [69, 61, 58], [38, 33, 30], [67, 62, 59], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [40, 32, 30], [67, 62, 59], [38, 33, 30], [67, 62, 59], [40, 32, 30], [69, 61, 59], [70, 60, 59], [70, 60, 59], [70, 60, 58], [69, 61, 58], [38, 33, 30], [67, 62, 59], [69, 61, 58], [70, 60, 58], [71, 59, 59], [70, 60, 59], [40, 32, 30], [67, 62, 59], [38, 33, 30], [67, 62, 59], [40, 32, 30], [69, 61, 59], [70, 60, 59], [71, 59, 59]], [[39, 34, 31], [38, 33, 30], [37, 33, 32], [37, 33, 32], [38, 33, 30], [37, 32, 29], [40, 31, 32], [38, 32, 32], [37, 33, 32], [35, 34, 32], [37, 33, 32], [37, 33, 32], [37, 33, 32], [37, 33, 32], [40, 31, 32], [40, 31, 32], [39, 34, 31], [38, 33, 30], [37, 33, 32], [37, 33, 32], [38, 33, 30], [37, 32, 29], [40, 31, 32], [38, 32, 32], [37, 33, 32], [35, 34, 32], [37, 33, 32], [37, 33, 32], [37, 33, 32], [37, 33, 32], [40, 31, 32], [40, 31, 32]]];

//document.body.innerHTML += `<canvas id="3Dcanvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
//document.body.innerHTML += `<canvas id="canvas" width="${canvasHeight}" height="${canvasWidth}" style="background-color: black;">Your browser does not support HTML5</canvas>`
const Dc = document.getElementById("3Dcanvas");
//var c = document.getElementById("3Dcanvas");

const Dcanvas=document.getElementById("3Dcanvas").getContext("2d");
//var canvas=document.getElementById("canvas").getContext("2d");

Dc.requestPointerLock = Dc.requestPointerLock ||
Dc.mozRequestPointerLock;

Dc.width = window.innerWidth;
Dc.height = window.innerHeight;

const canvasHeight=Dc.height;
const canvasWidth=Dc.width;

var j = canvasHeight/2+canvasHeight/4;

Dc.addEventListener("click", (ev)=>
{
    if(fullScr == false){Dc.style.cursor = 'none';}
    else if(fullScr == true){Dc.style.cursor = 'crosshair';}
    openFullscreen()
    Dc.requestPointerLock()
    fullScr = true;
})

window.addEventListener("keydown", (event)=>
{
    var keyCode = event.keyCode;
    switch(keyCode){
        case 27:
            fullScr = false;
        break;
    }
})

function openFullscreen() {
    if (Dc.requestFullscreen) {
        Dc.requestFullscreen();
    } else if (Dc.webkitRequestFullscreen) { /* Safari */
        Dc.webkitRequestFullscreen();
    } else if (Dc.msRequestFullscreen) { /* IE11 */
        Dc.msRequestFullscreen();
    }
}

var map = [
    [2,   2,   2,   2,   2,   2,   2,   2,   2,2],
    [2,r(7),r(7),r(7),r(7),r(7),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(8),r(8),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(8),r(9),r(9),r(8),r(7),r(7),2],
    [2,r(7),r(8),r(9),   0,   0,r(9),r(8),r(7),2],
    [2,r(7),r(8),r(9),   0,   0,r(9),r(8),r(7),2],
    [2,r(7),r(7),r(8),r(9),r(9),r(8),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(8),r(8),r(7),r(7),r(7),2],
    [2,r(7),r(7),r(7),r(7),r(7),r(7),r(7),r(7),2],
    [2,   2,   2 ,  2,   2,   2,   2,   2,   2,2]
];

function r(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*function drawMap(){
const [width, height] = [map[0].length, map.length]
for(var i=0; i<height; i++)
{
    for(var j=0;j<width;j++)
    {
        if(map[i][j] >= 1 && map[i][j] <= 4){
            canvas.fillStyle='white';
            canvas.fillRect(canvasWidth / width * j, canvasHeight / height * i, canvasWidth / width,  canvasHeight / height);
            canvas.fill();
        }else{
            canvas.fillStyle='gray';
            canvas.fillRect(canvasWidth / width * j, canvasHeight / height * i, canvasWidth / width,  canvasHeight / height);
            canvas.fill();
        }
    }
}

}*/
var collider = {
    x: x - 10,
    y: y - 10,
    width: 20,
    height: 20
}
function pointInside(wall, x, y)
{
    return wall.x - 0.01 < x && wall.x + wall.width + 0.01 > x && wall.y - 0.01 < y && wall.y + wall.height + 0.01 > y
}
function pointIs(wall, x, y)
{
    return wall.x == x || wall.x + wall.width == x || wall.y == y || wall.y + wall.height == y
}

function Collide(){
    const [width, height] = [map[0].length, map.length];
    for(var i=0; i<height; i++)
    {
        for(var j=0;j<width;j++)
        {
            if(map[i][j] >= 1  && map[i][j] <= 4){
                var wall = {
                    x: grid / width * j,
                    y: grid / height * i,
                    height: grid / height,
                    width: grid / width,
                }
                
                if(pointInside(wall, x-5, y-5) || pointInside(wall, x-5 ,y+5) || pointInside(wall, x+5, y-5) || pointInside(wall, x+5, y+5)){
                    x = lastX;
                    y = lastY;
                    tickX = x;
                    tickY = y;
                }
        }
        }
    }
}
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
var x = grid / 2;
var y = grid / 2;
var radius = 10;

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
    case 68: //d
        keyD = true;
        break;
    case 83: //s
        keyS = true;
        break;
    case 65: //a
        keyA = true;
        break;
    case 87: //w
        keyW = true;
        break;
    }
}

function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
    case 68: //d
        keyD = false;
        break;
    case 83: //s
        keyS = false;
        break;
    case 65: //a
        keyA = false;
        break;
    case 87: //w
        keyW = false;
        break;
    }
}

var tickX = grid / 2;
var tickY = grid / 2;

var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

var lastX;
var lastY;
function drawPlayer(){
    lastX = x;
    lastY = y;
    if (keyD == true) {
    var cX = x + Math.cos(-(mouse.x - 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyS == true) {
    var cX = x + Math.cos(-(mouse.x - 180) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x - 180) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyA == true) {
    var cX = x + Math.cos(-(mouse.x + 90) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x + 90) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
    if (keyW == true) {
    var cX = x + Math.cos(-(mouse.x) * Math.PI / 180) * speed;
    var cY = y + Math.sin(-(mouse.x) * Math.PI / 180) * speed;
    x=cX;
    y=cY;
    }
}
/*function reDoPlayer(){
window.requestAnimationFrame(reDoPlayer);
canvas.beginPath();
canvas.fillStyle = 'black';
canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
canvas.fill();
}
window.requestAnimationFrame(reDoPlayer);*/

function Distance(x1,x2,y1,y2){
    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2))
}
    
function rotate(velocity, angle){
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}
let mouse = {
x: 0,
y: 0
}

addEventListener("mousemove", function(event){
    mouse.x -= event.movementX;
    mouse.y += event.movementY;
});
 
window.requestAnimationFrame(Ray);

function Ray(){
    window.requestAnimationFrame(Ray);
    clearCanvas();
    for(var b = 0; b < ray_num; b+=adder)
    {
        const [width, height] = [map[0].length, map.length];
        var distArray = [];

        var found = false;

        var ray = {x: undefined,y: undefined};
        var yCheck = {x: undefined,y: undefined};
        var xCheck = {x: undefined,y: undefined};

        var ang = 360-FixAng(mouse.x+(ray_num/2-b));

        var xFound = false;
        var yFound = false;

        for(var offset = 0; offset < 11 && found == false; offset++){
            var tile = {
                x: offset*(canvasWidth / width),
                y: offset*(canvasHeight / height)
            };
            var wall;
            
            //DDA
        
            if(ang < 90){ //down-right
                yCheck.x = x+(grid-x-Math.floor((grid - x)/(square))*(square))+tile.x;
                yCheck.y = y+((grid-x-Math.floor((grid - x)/(square))*(square))+tile.x)*Math.abs(Math.tan(degToRad(ang)));
        
                xCheck.y = y+(grid-y-Math.floor((grid - y)/(square))*(square))+tile.y;
                xCheck.x = x+((grid-y-Math.floor((grid - y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(90-ang)));
            }else if(ang >= 90 && ang < 180){ //down-left
                yCheck.x = Math.floor((x)/(square))*(square)-tile.x;
                yCheck.y = y+(x-Math.floor((x)/(square))*(square)+tile.x)*Math.abs(Math.tan(degToRad(180-ang)));
        
                xCheck.y = y+(grid-y-Math.floor((grid - y)/(square))*(square))+tile.y;
                xCheck.x = x-((grid-y-Math.floor((grid - y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(ang-90)));
            }else if(ang >= 180 && ang < 270){ //up-left
                yCheck.x = Math.floor((x)/(square))*(square)-tile.x;
                yCheck.y = y-(x-Math.floor((x)/(square))*(square)+tile.x)*Math.abs(Math.tan(degToRad(ang-180)));
        
                xCheck.y = y-(y-Math.floor((y)/(square))*(square))-tile.y;
                xCheck.x = x-((y-Math.floor((y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(270-ang)));
            }else if(ang >= 270 && ang < 360){ //up-right
                yCheck.x = x+(grid-x-Math.floor((grid - x)/(square))*(square))+tile.x;
                yCheck.y = y-((grid-x-Math.floor((grid - x)/(square))*(square))+tile.x)*Math.abs(Math.tan(degToRad(360-ang)));
        
                xCheck.y = y-(y-Math.floor((y)/(square))*(square))-tile.y;
                xCheck.x = x+((y-Math.floor((y)/(square))*(square))+tile.y)*Math.abs(Math.tan(degToRad(ang-270)));
            }
        
        
            //check
            for(var i=0; i<height; i++)
            {
                for(var j=0;j<width;j++)
                {
                    if(map[i][j] > 0 && map[i][j] <= 4){
                        wall = {
                            x: grid / width * j,
                            y: grid / height * i,
                            height: square,
                            width: square,
                            color: map[i][j]
                        };
                        if(pointInside(wall, xCheck.x, xCheck.y)){
                            ray.x = xCheck.x;
                            ray.y = xCheck.y;
                            //drawRay(x,y,ray.x,ray.y);
                            distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall, l:50, xPixel:xCheck.x-wall.x});
                            xFound = true;
                        }
                        if(pointInside(wall, yCheck.x, yCheck.y)){
                            ray.x = yCheck.x;
                            ray.y = yCheck.y;
                            //drawRay(x,y,ray.x,ray.y);
                            distArray.push({dist:Distance(x,ray.x,y,ray.y), wall:wall, l:0, xPixel:yCheck.y-wall.y});
                            yFound = true;
                        }
                    }
                }
            }

            if(xFound && yFound){
                found == true;
            }
        }

        var dist,CorrDist;
        var MIN=999999;
        for(var i=0;i<distArray.length;i++)
        {
            if(distArray[i].dist<MIN) 
            {
                MIN = distArray[i].dist;
                dist=distArray[i];

                dist.dist *= Math.cos(degToRad(ray_num/2-b));
            }

        }

        draw3D(dist, b);
    }
}




/*function drawRay(x1,y1,x2,y2) {
    canvas.beginPath();
    canvas.strokeStyle = 'red';
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);   
    canvas.stroke();
}*/

    function draw3D(dist, b) {
        var Rdist = Math.round(255-dist.dist/RGBmultiplyer-dist.l);
        if(Rdist<0){
            Rdist = 0;
        }
        if(Rdist>255){
            Rdist = 255;
        }
        var Sdist = Rdist.toString();
    

        for(var i=0; i<texWall.length; i++){
            Dcanvas.beginPath();
            var pixel=texWall[i][Math.floor((dist.xPixel/square)*texWall.length)];
            try{
            var Cdist = Number.parseInt(Sdist)
            var R = Math.max(pixel[0]-127+Cdist,0);
            var G = Math.max(pixel[1]-127+Cdist,0);
            var B = Math.max(pixel[2]-127+Cdist,0);
            Dcanvas.fillStyle=`rgb(${R},${G},${B})`
            }catch (e){}
            var size = s/dist.dist;
            var pos = canvasHeight-(size)/2+canvasHeight/4;

            Dcanvas.fillRect(
                canvasWidth/ray_num * b,
                pos-canvasHeight/2-canvasHeight/4+(size/texWall.length)*i,
                canvasWidth/ray_num/divider,
                size/texWall.length);
            Dcanvas.fill();
        }
    }


function arrayMin(arr) { return Math.min.apply(Math, arr); }
function arrayMax(arr) { return Math.max.apply(Math, arr); }
function FixAng(ang){         
    if(ang>360)
    {
        var mult = Math.ceil(ang/360);
        ang = (360*mult)-ang;
    } 
    if(ang<0)
    {
        var ap = Math.abs(ang);
        var mult = Math.ceil(ap/360);
        ang = (360*mult)-ap;
    } return ang;}
function distance(ax,ay,bx,by,ang){ return Math.cos(Math.degToRad(ang))*(bx-ax)-sin(Math.degToRad(ang))*(by-ay);}
function degToRad(degrees){var pi = Math.PI;return degrees * (pi/180);}


    function clearCanvas(){
    
        Dcanvas.beginPath();
        Dcanvas.fillStyle = `rgb(255,255,255)`;
        Dcanvas.fillRect(0, 0, canvasWidth, Math.round(canvasHeight));
        
        var grd = Dcanvas.createLinearGradient(0, canvasHeight/2/*-fixAng2(mouse.y)*/-j, 0, canvasHeight*2/*-fixAng2(mouse.y)*/-j);
        
        grd.addColorStop(0, `rgb(0,0,0)`);
        grd.addColorStop(.50, `rgb(10,10,10)`);
        grd.addColorStop(.65, `rgb(190,190,190)`);
        grd.addColorStop(1, `rgb(255,255,255)`);
        
        Dcanvas.fillStyle = grd;
        Dcanvas.fillRect(0, 0, canvasWidth, canvasHeight);
        Dcanvas.fill();
    }

function CPoints(angle, radius, distance){
    return {
        x: x + radius * Math.cos(angle * Math.PI / 180) * distance,
        y: y + radius * Math.sin(angle * Math.PI / 180) * distance
    
    }
}

setInterval(drawPlayer, 20);
//setInterval(drawMap, 15);
setInterval(Collide, 1);

