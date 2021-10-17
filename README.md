# sah-challenge-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

## Technologies Used

- **Typescript**: In order to add types
- **Vuejs**: As a Framework for the UI
- **Vuex**: As a state management library
- **Axios**: To Manage the API calls
- **postcss**: As a css 'preprocessor'
- **Jest & vue-test-utils**: As tools for unit / integration testing
- **Cypress**: As e2e testing tool


## Decisions
- The store in this project is not necessary with the actual scope of the project, otherwise if the project needs to growth in the future it can be a good solution, so for the sake of the demostration in the challenge I have opted for adding some patterns that are not neccesary in small projects
- A good addition to the houseList is a placeholder image for the cases when the image doesn't load, but I prefer to priorize the sorting and pagination functionalities



## Application Diagram
![sah Frontend Diagram](https://github.com/Vergara92/sah-challenge-frontend/blob/main/sah-frontend-diagram.jpg)
