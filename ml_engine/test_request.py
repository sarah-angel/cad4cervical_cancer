import requests, json
import base64 
headers = { "Content-Type": "application/json"}

b64image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QD4RXhpZgAASUkqAAgAAAAMAAABAwABAAAAZgUAAAEBAwABAAAAqwIAAAIBAwAEAAAAngAAAAMBAwABAAAABQAAABIBAwABAAAAAQAAABUBAwABAAAABAAAABoBBQABAAAApgAAABsBBQABAAAArgAAABwBAwABAAAAAQAAACgBAwABAAAAAgAAADEBAgAQAAAAtgAAAGmHBAABAAAAxgAAAAAAAAAIAAgACAAIAIBPEgAQJwAAgE8SABAnAABTaG90d2VsbCAwLjMwLjIAAwABoAMAAQAAAP//AAACoAkAAQAAAIgAAAADoAkAAQAAAIgAAAAAAAAA/+EJ9Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxMzYiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMzYiIHRpZmY6SW1hZ2VXaWR0aD0iMTM2IiB0aWZmOkltYWdlSGVpZ2h0PSIxMzYiIHRpZmY6T3JpZW50YXRpb249IjEiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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'


# from PIL import Image
# import io
# import matplotlib.pyplot as plt
# import tensorflow as tf
# from keras.preprocessing import image

# image = b64image.split(",")[1]


# bin = base64.b64decode(image)

# img = Image.open(io.BytesIO(bin))

# plt.imshow(img)
# plt.show()


import pandas as pd

obj = json.dumps([{
    'name': 'Angel',
    'age': 20,
    'bal': 'kjkfj',
    'jkdjf': 34,
    'kdaf': True
    
}])

df = pd.read_json(obj, orient='records')

print(df)