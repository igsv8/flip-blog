# FlipBlog

This project is a simple blog application built with Angular and RxJS. It allows users to view a list of blog posts, view a detailed view of a post, and create new blog posts.

## Features

- View a list of blog posts
- View a detailed view of a post
- Create new blog posts

## Technical decisions

- Decided to use ngrx/entity for improving the efficiency with wich the data is handled. Entities are stored by their IDs, making it easy to access specific entities by their unique identifier without needing to traverse the array of posts as they come from the API. 
- Chose not to use any UI library to keep things simpler for this usecase 


## Future improvements
- Add pagination to the posts list - at this point all posts are loaded at once and this can become a performance issue if the number of posts grows. (API has 251 posts atm)
- Add automated testing 
