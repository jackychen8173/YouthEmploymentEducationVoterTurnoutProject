import pandas as pd

df = pd.read_csv("Voter_Turnout_by_Age_Group_2004-2021.csv")
df = df.loc[:, ~df.columns.str.contains("_F")]
df = df.drop(columns=df.columns[df.columns.str.contains("PROVINCE_E")])
df = df.drop(columns=df.columns[df.columns.str.contains("GENDER_E")])
df = df.drop(columns=df.columns[df.columns.str.contains("Unnamed")])

df_cleaned = df.rename(columns={
    'ELECTION_E': 'election',
    'AGE_GROUP_E': 'age_group',
    'VOTES': 'votes',
    'ELIGIBLE_ELECTORS': 'eligible_electors',
    'TURNOUT_ELIGIBLE_ELECTOR': 'turnout'
})

df_pivoted = df_cleaned.pivot_table(
    index='election',
    columns='age_group',
    values='turnout',
    aggfunc='first'
)
df_pivoted.reset_index(inplace=True)

df_pivoted.to_csv("voter_turnout.csv")