Update - 1/26/2021 
Make sure you enter your API key and secret into your local config.py file b
Run create_collections.ipynb 
**the only dependent file is zip_lat_lon.csv, in the col_resources directory 

This code will create a mongo collection called final_data, which contains 
the data from the animals API call, the organizations API call, and external
latitude and longitude data correlated by zip code.  

Update - 1/27/2021 (Deepa)
To get the dog_breed and cat_breeds collection:
1. Run AKC_Scraping/dog_breeds_mongo_db.ipynb
This code will create a dog_breeds mongo db collection containing all the dog breed information. 
* Dependant file: breeds_v2_clean.csv
** Do not run AKC_Breed_Scrape.ipynb. AKC_Breed_Scrape.ipynb has been run and the resulting output is breeds_v2_clean.csv

2. Run Cat_breeds_scrape/cat_breeds_mongo_db.ipynb
This code will create a cat_breeds mongo db collection containing all the cat breed information. 
* Dependant file: cat_breeds_all_clean.csv
** Do not run any of the other notebooks in Cat_breeds_scrape folder. 