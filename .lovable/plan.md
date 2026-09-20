# Carrito Clip y mejora responsive

## Objetivo
Convertir el sitio en una experiencia móvil cuidada, retirar el botón flotante de WhatsApp e integrar un carrito de una sola experiencia con pago completo mediante Clip en ambiente de prueba.

## Cambios
- Corregir el responsive en navegación, portada, tarjetas, galerías, videos, formularios y pie de página para móvil, tableta y escritorio.
- Mantener el menú móvil a pantalla completa, con textos legibles, zonas táctiles amplias y sin desbordamientos.
- Eliminar únicamente el botón flotante de WhatsApp; conservar los datos de contacto existentes donde correspondan.
- Añadir un carrito de una experiencia con selector de paquete, fecha, cantidad de pasajeros y resumen del total.
- Validar los datos según el paquete: mínimo de pasajeros, precios por persona o pareja, campos de contacto, fecha futura y aceptación de términos.
- Cobrar el 100% del total con el formulario seguro alojado por Clip; los datos de tarjeta no pasarán por la aplicación.
- Enviar el token de pago a Clip únicamente desde el servidor y mostrar estados claros de procesando, aprobado o rechazado.
- Guardar la clave privada de prueba de forma segura y exponer al navegador solo la llave pública requerida por el SDK.
- Añadir fotografías proporcionadas por el usuario en Nosotros, Galería y Contacto, con encuadres adaptables.
- Reorganizar recomendaciones en tres etapas: antes, durante y después del vuelo.

## Datos y seguridad
- Usar Lovable Cloud para registrar intentos y resultados de pago, evitar cobros duplicados y procesar notificaciones de Clip.
- Validar en navegador y servidor con límites estrictos; el servidor recalculará paquete, cantidad y total sin confiar en importes enviados por el navegador.
- No registrar credenciales, tokens de tarjeta ni datos sensibles.
- Mantener todo en ambiente de prueba hasta que el negocio habilite credenciales reales.

## Verificación
- Probar rutas principales en móvil, tableta y escritorio.
- Confirmar ausencia de desbordamientos, legibilidad en día/noche y funcionamiento del carrito.
- Ejecutar una transacción de prueba de Clip y revisar respuestas seguras.
- Confirmar compilación y navegación sin errores.
