# Instructivo

## Instalación

Una vez clonado el proyecto, instalo las dependencias:

```bash
yarn install
```

## Utilización

Para correr el servidor, primero ejecuto el comando: 

```bash
yarn start
```

Y luego pego la siguiente URL en el navegador 

```bash
http://localhost:4000/graphql
```

Hay disponibles 4 operaciones, las cuales son útiles para el desarrollo del Login y el Registro.

### login

```bash
mutation {
  login(
     data: { 
       identity_number: "12345678", 
       password: "p4ssw0rd" 
     }
  )
}
```

### users

```bash
query {
  users{
    id
  }
}
```

### register

```bash
mutation {
  register
  (data:
    {
      first_name: "Nombre del usuario",
      last_name: "Apellido del usuario",
      identity_number: "12345678",
      health_insurance_id: "4353434356765678",
      health_insurance_name: "OSDE",
      mobile_phone: "+541132345543",
      phone: "01143334567",
      street: "Calle falsa",
      number: "123",
      apartment_suit: "3D",
      city: "Capital Federal",
      neighborhood: "Capital Federal",
      province: "Buenos Aires",
      email:"test@test.com",
      emergency_phone: "+541132123487",
      password: "p4ssw0rd",
    })
  {
    id,
  }
}
```

### deleteAll

```bash
mutation {
  deleteAll
}
```