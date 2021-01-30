# Coding Angels - Rescue Angels
> Our goal for this project is to create a website that helps people find their perfect lovable pet & actually browse current adoption listings to source where to get a desired breed of dog or cat. Or both!

> See more information from our [Google Slides Presentation Here](https://docs.google.com/presentation/d/19k5C-MS9-BizZANY5uNOPcoqSFk2wY0-2bBoFTfp9O4/edit#slide=id.p)

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Local Environment Setup](#Local-Environment-Setup)
* [Features & Visulizations](#features-visualizations)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
### Team Members:
- [Chloe Veras](https://github.com/cveras33)
- [Deepa Vadakan](https://github.com/deepavadakan)
- [Jennifer Dean](https://github.com/Jen-Dean)
- [Jessi Volosin](https://github.com/jvolosin)
- [Kasey Lacerda](https://github.com/KLacerda08)
- [Osvaldo (Ozzie) Mauricio Moreno](https://github.com/sir-omoreno)

### API & Data Sources:
- [PetFinder API](https://www.petfinder.com/developers/)
  - [PetFinder API Documentation](https://www.petfinder.com/developers/v2/docs/)
- [Rescue Group API](https://rescuegroups.org/services/adoptable-pet-data-api/)
  - [Rescue Group API Documentation](https://test1-api.rescuegroups.org/v5/public/docs)
- [JavaScript Libraries](https://medium.com/javascript-in-plain-english/best-javascript-data-visualization-libraries-for-2020-15291919a176)

### Web Scraping Data Sources:
- [PetFinder](https://www.petfinder.com/)
- [American Kennel Club](https://www.akc.org/)
- [The Cat Fancier's Association](https://cfa.org/)
- [Purina](https://www.purina.com/)

## Screenshots
`comming soon!`

## Technologies
* Python
* Flask
* MongoDB
* HTML/ CSS
* Javascript
* JSON
* Web APIs 
* Gunicorn
* Heroku

## Libraries
* Pandas
* Gunicorn
* Bootstrap
* D3
* Numpy
* Pymongo
* flask_pymongo
* Splinter
* Selenium
* BeautifulSoup
* [Petpy](https://pypi.org/project/petpy/)

## Local Environment Setup (Before Heroku Deployment)
0) install `pip install petpy` to your environment
1) set up a local config.py file with your PetFinder.com `API_KEY` and `API_SECRET`
2) set up a config.js file with your `MAPBOX_API_KEY` within "static/js" folder
3) Run Files ```AKC_Scraping/dog_breeds_mongo_db.ipynb``` and ```Cat_breeds_scrape/cat_breeds_mongo_db.ipynb``` to collect the data and place in a local MongoDB
4) Run and RESTART the Kernal from File ```create_collections.ipynb```
5)Run `python app.py` to open the flask web application

## Code Examples
`comming soon!`

## Features & Visulizations
* USA Map of Current Adoption availabilites based on type of animal.
   * Note - due to PetFinder API limits, we were only able to gather 10,000 adoptable animals.
* Data Visual sunburst graphic of the Different Amounts of Cat & Dog Breeds in the world
   * This includes characteristics, care, traits, and other description information
* USA Map of Current Adoption organization centers, layered with how many pets are available in that shelter
* Static Visual graphs including:
    * Dogs vs Cats available per state
    * Percentage of dogs and cats available by breed
    * Percentage of ages of available dogs and cats
    * Percentage of genders of available dogs and cats

## Status
Project is: _in progress_

## Inspiration
Inspired by Rutgers Data Visulization Bootcamp & lovey fluffy animals everywhere!

## Contact
Created by:
- [Chloe Veras](https://github.com/cveras33)
- [Deepa Vadakan](https://github.com/deepavadakan)
- [Jennifer Dean](https://github.com/Jen-Dean)
- [Jessi Volosin](https://github.com/jvolosin)
- [Kasey Lacerda](https://github.com/KLacerda08)
- [Osvaldo (Ozzie) Mauricio Moreno](https://github.com/sir-omoreno)
