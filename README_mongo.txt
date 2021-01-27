Update - 1/26/2021 
Make sure you enter your API key and secret into your local config.py file b
Run create_collections.ipynb 
**the only dependent file is zip_lat_lon.csv, in the col_resources directory 

This code will create a mongo collection called final_data, which contains 
the data from the animals API call, the organizations API call, and external
latitude and longitude data correlated by zip code.  