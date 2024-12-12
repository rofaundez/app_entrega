describe('Prueba de Login y Logout', () => {
  it('Debe ingresar con credenciales correctas y salir del sistema', () => {
    
    cy.visit('/ingreso') 

    cy.wait(3000);

    
    cy.get('#login-email').type('atorres') 
    cy.get('#login-password').type('1234') 

    cy.wait(3000);

    
    cy.get('#login-button').click() 

    cy.wait(3000);

    
    cy.url().should('include', '/inicio') 
    cy.contains('Bienvenido') 

    cy.wait(3000);

    
    cy.get('#logout-button').click() 

    cy.wait(3000);


    cy.url().should('include', '/ingreso')
    cy.contains('Iniciar sesión') 

    cy.wait(3000);
  })
})

describe('Prueba de Login con credenciales incorrectas', () => {
  it('No debe permitir ingresar con credenciales incorrectas', () => {
    // Paso 1: Visitar la página de ingreso
    cy.visit('/ingreso'); // Asegúrate de que la URL sea la correcta

    cy.wait(1000);

    // Paso 2: Completar el formulario de inicio de sesión con credenciales incorrectas
    cy.get('#login-email').type('usuario_incorrecto'); // Ingresar un correo incorrecto
    cy.get('#login-password').type('contraseña_incorrecta'); // Ingresar una contraseña incorrecta

    cy.wait(1000);

    // Paso 3: Hacer clic en el botón de login
    cy.get('#login-button').click();

    cy.wait(1000);

    // Paso 4: Verificar que la página no redirige y se queda en la página de ingreso
    cy.url().should('include', '/ingreso'); // Verificar que aún estamos en la página de ingreso

    // Paso 5: Verificar que se muestra el mensaje de error
    cy.get('ion-toast').shadow().find('.toast-message').should('contain', 'El correo o la password son incorrectos');

  });
});


describe('Foro - Agregar publicación', () => {
  it('Debe agregar una nueva publicación', () => {
    
    cy.visit('/forum');

    cy.get('#postTitle').type('Título de prueba');
    cy.get('#postDescription').type('Descripción de prueba'); 

    cy.intercept('GET', '/api/posts').as('getPosts');
    cy.get('#savePostButton').click(); 
    cy.wait(1000);
    
    cy.get('#recentPostsList', { timeout: 10000 }).should('exist'); // Verificar que la lista existe
    cy.get('#recentPostsList').contains('Título de prueba', { timeout: 10000 }); // Verificar el título
    cy.get('#recentPostsList').contains('Descripción de prueba', { timeout: 10000 }); // Verificar la descripción
  });
});

