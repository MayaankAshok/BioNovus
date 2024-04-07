import cv2
import matplotlib.pyplot as plt 
import numpy as np


def get_intensity(img_path):
    img = cv2.cvtColor(cv2.imread(img_path, cv2.IMREAD_COLOR), cv2.COLOR_BGR2RGB)
    edges = cv2.Canny(img,150,200)
    contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    imgcpy = img.copy()
    rect = cv2.minAreaRect(np.concatenate(contours))
    box = cv2.boxPoints(rect)
    box = np.intp(box)
    cv2.drawContours(imgcpy, [box], -1, (0,0,255), 3)
    # plt.imshow(imgcpy)
    center = np.array(rect[0])
    len_big = max(rect[1])
    len_small = min(rect[1])
    angle = rect[2]
    rot = np.array([[np.cos(angle*np.pi/180), -np.sin(angle*np.pi/180)],
                    [np.sin(angle*np.pi/180), np.cos(angle* np.pi/180)]])
    center1 = center + rot@ np.array([1,0] if rect[1][0] > rect[1][1] else [0,1]) * len_big * 0.34 
    center2 = center - rot@ np.array([1,0] if rect[1][0] > rect[1][1] else [0,1]) * len_big * 0.34 
    center1 = list(map(int, center1))
    center2 = list(map(int, center2))

    box_size = (len_small, len_big*0.1)
    # box_size = (len_small*0.8, len_big*0.08)
    if rect[1][0] < rect[1][1]:
        box_size = box_size[::-1]
    rect1  = (center1, box_size, (angle + 90)%360)
    box1 = cv2.boxPoints(rect1)
    box1 = np.intp(box1)

    rect2  = (center2, box_size, (angle + 90)%360)
    box2 = cv2.boxPoints(rect2)
    box2 = np.intp(box2)
    cv2.drawContours(imgcpy, [box1], -1, (255,0,255), 3)
    cv2.drawContours(imgcpy, [box2], -1, (0,255,255), 3)
    imgcpy_hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    mask1 = np.zeros(imgcpy.shape[: 2], np.uint8)
    cv2.drawContours(mask1, [box1], -1, (255,255,255), -1)
    mean1 = cv2.mean(imgcpy_hsv, mask=mask1)
    # plt.imshow(mask1)
    mask2 = np.zeros(imgcpy.shape[: 2], np.uint8)
    cv2.drawContours(mask2, [box2], -1, (255,255,255), -1)
    mean2 = cv2.mean(imgcpy_hsv, mask=mask2)
    intensity  =abs(mean1[1] - mean2[1])
    
    # print("Rect :", rect)
    # print("Mean 1 :", mean1)
    # print("Mean 2 :", mean2)
    print("Intensity : ", intensity )
    # plt.title (f"Intensity : {intensity:.3f}" )
    # plt.imshow(imgcpy)
    # plt.show()
    return intensity
