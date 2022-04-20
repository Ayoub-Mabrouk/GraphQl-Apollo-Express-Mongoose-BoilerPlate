
# GraphQL Express server Boilerplate

On my first interaction with GraphQL i tried to create this Boilerplate for future projects



## Installation

Clone the project

```bash
  git clone https://github.com/Ayoub-Mabrouk/GraphQl-Apollo-Express-Mongoose-BoilerPlate
```


Install packages with yarn/npm

```bash
  yarn
  or
  npm install
```
Environment Variables

```bash
  cp .env.example .env
  # you should be able to modify the environment variables in the .env .
```

## Commands

Start the server

```bash
  yarn dev
```



Generate types based on the graphQL-Schema

```bash
  yarn gen
  # types can be found at src/generated/graphql.ts
```


## Creating a Model

- go to the models directory

```bash
linux commands:

  cd src/models
  mkdir ModelName && touch ModelName/index.ts
```

- Take a look at the existing Models (User/Company/Role)
- import your model into src/models/index, to use the destructure operator when you need to use your models elsewhere


## Creating a Schema (Type-defs)

- go to the graphql-schema directory
- each type has it's own folder
- each folder has two files (Schema & Resolver)
```bash
linux commands:

  cd src/graphql-schema
  mkdir schemaname && touch schemaname/schema.graphql
```

- Take a look at the existing Schemas (user/company/role)
- src/graphql-schema/index is where all type-defs and resolvers get merged to make a schema



## DataLoader Included for queries performance optimization
Check [DataLoader Docs](https://github.com/graphql/dataloader)

### Tips resolvers that has a relationship :
#### case 1 : Each user is working at only 1 company
- extract dataLoader from the context
- try to use load in this situation
```
return await dataLoader?.company.load(company)

```
#### case 2 : Each user is has multiple roles
- extract dataLoader from the context
- try to use loadMany in this situation
```
return await dataLoader?.company.loadMany(roles)

```

### Now try to add that resolver to the export default of src/lib/dataloader.ts
- import your model and pass it insdie the newLoader function

```
export default {
    //each sub-resolver will have its own dataloader
    company: newLoader(companyModel),
    role: newLoader(roleModel)
};
```
## Shield Included to ease the creation of permission layer
Check [Shield Docs](https://www.graphql-shield.com/docs/shield)
- rules can be found or added inside:
```
cd src/permissions/rules.ts
```
- use the rules inside permissions/index.ts to specify certain permissions for certain users.


## Tech Stack

**Database:** Mongodb

**ODM/MongoDB Node.js Driver:** Mongoose
 
**Server:** NodeJs, Express,Apollo-Server-Express

**Best Tool:** TypeScript



## Contributing

Contributions are always welcome!




## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@Ayoub Mabrouk](https://www.github.com/Ayoub-Mabrouk)
