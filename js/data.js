// Propiedades publicadas en el Escaparate Relko.
// Sustituid este listado por vuestras propiedades reales; 'video' y 'vertical'
// serían los enlaces a los vídeos cuando existan.
const PROPIEDADES = [
  {
    id: 1, titulo: 'Piso reformado con terraza', zona: 'Eixample', ciudad: 'Barcelona',
    tipo: 'Piso', precio: 385000, hab: 3, banos: 2, m2: 92, alta: 8,
    agencia: 'Finques Bonavista', contacto: 'relko.estate@gmail.com',
    desc: 'Vivienda exterior reformada en 2021, con terraza orientada a sur y mucha luz durante todo el día. Finca con ascensor y portería.',
    extras: ['Terraza de 14 m²', 'Reformado en 2021', 'Ascensor', 'Calefacción individual'],
    duracion: '1:12'
  },
  {
    id: 2, titulo: 'Casa con jardín y piscina', zona: 'Sant Cugat', ciudad: 'Barcelona',
    tipo: 'Casa', precio: 745000, hab: 5, banos: 3, m2: 260, alta: 6,
    agencia: 'Vallès Propietats', contacto: 'relko.estate@gmail.com',
    desc: 'Casa unifamiliar en zona residencial tranquila, con jardín, piscina privada y garaje para dos coches. Cerca de colegios internacionales.',
    extras: ['Parcela de 480 m²', 'Piscina privada', 'Garaje doble', 'Zona residencial'],
    duracion: '1:40'
  },
  {
    id: 3, titulo: 'Ático con vistas despejadas', zona: 'Gràcia', ciudad: 'Barcelona',
    tipo: 'Ático', precio: 520000, hab: 2, banos: 2, m2: 78, alta: 3,
    agencia: 'Relko · particular', contacto: 'relko.estate@gmail.com',
    desc: 'Ático en finca regia con terraza propia y vistas abiertas sobre los tejados del barrio. Se vende directamente por el propietario.',
    extras: ['Terraza de 22 m²', 'Última planta', 'Vistas despejadas', 'Vende particular'],
    duracion: '0:58'
  },
  {
    id: 4, titulo: 'Piso a estrenar junto al mercado', zona: 'Rubí', ciudad: 'Barcelona',
    tipo: 'Piso', precio: 232000, hab: 3, banos: 1, m2: 84, alta: 12,
    agencia: 'Habitat Rubí', contacto: 'relko.estate@gmail.com',
    desc: 'Obra nueva entregada este año, con cocina equipada y plaza de aparcamiento opcional. A dos minutos del mercado y de la estación.',
    extras: ['Obra nueva', 'Cocina equipada', 'Aparcamiento opcional', 'Junto a la estación'],
    duracion: '1:05'
  },
  {
    id: 5, titulo: 'Dúplex con estudio independiente', zona: 'Sabadell', ciudad: 'Barcelona',
    tipo: 'Dúplex', precio: 298000, hab: 4, banos: 2, m2: 130, alta: 19,
    agencia: 'Finques Bonavista', contacto: 'relko.estate@gmail.com',
    desc: 'Dúplex en el centro con una planta superior habilitada como estudio o despacho, con acceso independiente desde la escalera.',
    extras: ['Estudio independiente', 'Dos plantas', 'Zona centro', 'Trastero incluido'],
    duracion: '1:24'
  },
  {
    id: 6, titulo: 'Apartamento a pie de playa', zona: 'Sitges', ciudad: 'Barcelona',
    tipo: 'Piso', precio: 445000, hab: 2, banos: 1, m2: 66, alta: 5,
    agencia: 'Costa Garraf Homes', contacto: 'relko.estate@gmail.com',
    desc: 'Apartamento en primera línea con balcón frontal al mar. Alta demanda de compradores extranjeros: el vídeo se entrega también en inglés.',
    extras: ['Primera línea de mar', 'Balcón frontal', 'Vídeo también en inglés', 'Piscina comunitaria'],
    duracion: '1:08'
  },
  {
    id: 7, titulo: 'Casa de pueblo rehabilitada', zona: 'Terrassa', ciudad: 'Barcelona',
    tipo: 'Casa', precio: 349000, hab: 4, banos: 2, m2: 175, alta: 22,
    agencia: 'Vallès Propietats', contacto: 'relko.estate@gmail.com',
    desc: 'Casa de pueblo rehabilitada respetando la viga vista y la piedra original, con patio interior y azotea transitable.',
    extras: ['Patio interior', 'Azotea transitable', 'Viga vista', 'Rehabilitada'],
    duracion: '1:31'
  },
  {
    id: 8, titulo: 'Estudio céntrico para inversión', zona: 'Ciutat Vella', ciudad: 'Barcelona',
    tipo: 'Estudio', precio: 148000, hab: 1, banos: 1, m2: 38, alta: 15,
    agencia: 'Relko · particular', contacto: 'relko.estate@gmail.com',
    desc: 'Estudio reformado con buena rentabilidad de alquiler, en una de las zonas con más demanda del centro. Actualmente alquilado.',
    extras: ['Alquilado actualmente', 'Reformado', 'Zona de alta demanda', 'Vende particular'],
    duracion: '0:46'
  }
];
