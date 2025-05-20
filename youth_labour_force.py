import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("youth_labour_force.csv")
columns_to_keep = ["REF_DATE", "GEO", "Educational attainment level", "Labour force and education status", "VALUE"]

df = df[columns_to_keep]

df = df.rename(columns={
    'REF_DATE': 'year',
    'GEO': 'location',
    'Educational attainment level': 'education_level',
    'Labour force and education status': 'status',
    'VALUE': 'value'
})

df_grouped = df.groupby(['year', 'location', 'education_level', 'status'], as_index=False).sum()
df.to_csv("youth_labour_force_out.csv", index=False)

