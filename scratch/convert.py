print("Starting...")
try:
    with open('/Volumes/Mac-HMH/Desktop/hmhlabz-new/html/about_decoded.html', 'r') as f:
        print("Read html")
except Exception as e:
    print("Error reading:", e)

with open('/Volumes/Mac-HMH/Desktop/hmhlabz-new/scratch/converted.jsx', 'w') as f:
    f.write("TEST")
    print("Wrote test")
