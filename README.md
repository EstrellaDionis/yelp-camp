<header>
<h1>Yelpcamp</h1>
</header>
<div>
<p>This is a project using express, mongodb and ejs to make a site that display campgrounds for people to visit similar to airbnb. This is my first time using mongodb and ejs and it's very fun!</p>
</div>

### npm i to install dependencies

- ejs
- ejs-mate
- express
- express-session
- method-override
- mongoose
- joi
- connect-flash
- passport
- passport-local
- passport-local-mongoose
- cloudinary
- dotenv
- multer
- multer-storage-cloudinary

#### Campground Routes

#### [GET] /camgrounds
Returns every campground in the database

#### [GET] /campgrounds/new
Create a new campground

#### [GET] /campgrounds/:id
Returns a specific campground

#### [GET] /campgrounds/:id/edit
Edit a specific campground

#### [POST] /campgrounds

#### [PUT] /campgrounds/:id

#### [DELETE] /campgrounds/:id

#### Review Routes

#### [POST] /campgrounds/:id/reviews

#### [DELETE] /campgrounds/:id/reviews/:reviewId
