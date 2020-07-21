# Sinking Atolls

Raising awarness for the sinking Marshall Islands.

## Inspiration

Most problems in the world today stem from global warming. Rising sea levels are of concern in atolls around the world, especially the Marshall Islands since they have undergone extensive nuclear testing (105 tests!) in the 1940s causing destruction among the islands. These atolls are one of the first to fall underwater in the near future. 

Unfortunately irreversible, we can spread awareness to this issue and pledge donations to organizations such as https://www.atollconservation.org/ (conserves the islands) and many more. These critical donations can help the communities living in the Marshall Islands to preserve their culture, help with the drought, and help improve their impoverished country. Also, by showing the impact that global warming has on these islands, we can encourage people to enforce preventative measures such as decreasing pollution, emissions, etc.

We can change the lives of the people living on these islands if we pay attention to their situation and how a 2-degree increase in global temperature affects them greatly.  

(To read more about how the United States betrayed the Marshall Islands with their WW2 nuclear testing, read here: https://www.spokesman.com/stories/2019/dec/04/how-the-us-betrayed-the-marshall-islands-kindling-/ )

## What it does

To spread awareness, we created a website that shows the rise of the sea levels on 3D models of some of the Marshall Islands that have tide-gauge data. This visual can be rotated, zoomed in, and viewed over the years to truly understand the effect global warming has on the sinking atolls. We also used machine learning to predict the rising sea-levels of each atoll to realize future outcomes for the Marshall Islands. This can help viewers understand when the communities living there would have to leave, and when the atolls would become uninhabitable. 

## How we built it

The technologies used for this project are stated below:

-  AWS Elastic Beanstalk: Deploying the site
- Tensorflow.js: Apply machine learning algorithms to predict future sea-levels.
- Three.js: Allow for the 3D models to display on the web page + add animations.
- Blender: To create the 3D model of each island (used BlenderGIS for map rendering).
- JQuery: To read the data and execute requests.
- Node.js: To host and run the site with url postfixes
- HTML/CSS/Javascript: For content, styling and functionality.

## Challenges we ran into

- Creating the Blender models from scratch, without having previous knowledge on it. This was especially difficult due to the complex shape of each island. 
- Integrating three.js with the rest of the application so that it works in unison. 
- Using the results obtained from TensorFlow and applying them to our 3D model.
- Since we had a unique tech stack, it was difficult to find the right AWS web hosting platform to use. 

## Accomplishments that we're proud of

Our biggest accomplishment in this project was integrating all these different technologies. Their differences were challenging to merge but resulted in the completion of the original idea and our interactive application.

## What we learned

Some skills we learned included: 

- Creating Blender models
- Deploying on AWS for the first time 
- Using Github “project” tab to organize our progress and issues. 

## What's next for Sinking Atolls

In the future, we hope to add notifications such as when the atoll becomes uninhabitable, or when the recommended time should be for humans to evacuate. We also hope to add more features on the site to further spread awareness like an email notification system of the recent news, suggestions on how to prevent global warming, and much more.

## Data

Permanent Service for Mean Sea Level (PSMSL), 2020, "Tide Gauge Data", <br>
Retrieved 13 Jun 2020 from http://www.psmsl.org/data/obtaining/. <br>

Simon J. Holgate, Andrew Matthews, Philip L. Woodworth, Lesley J. Rickards, Mark E. Tamisiea, Elizabeth Bradshaw, Peter R. Foden, Kathleen M. Gordon, Svetlana Jevrejeva, and Jeff Pugh (2013) New Data Systems and Products at the Permanent Service for Mean Sea Level. Journal of Coastal Research: Volume 29, Issue 3: pp. 493 – 504. doi:10.2112/JCOASTRES-D-12-00175.1.
