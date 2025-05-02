-- Tabla PAIS
CREATE TABLE PAIS (
    ID_PAIS BIGSERIAL PRIMARY KEY,
    DESCRIPCION_PAIS VARCHAR(30) NOT NULL
);

-- Tabla REGION
CREATE TABLE REGION (
    ID_REGION BIGSERIAL PRIMARY KEY,
    DESCRIPCION_REGION VARCHAR(50) NOT NULL,
    ID_PAIS BIGINT NOT NULL,
    CONSTRAINT fk_region_pais FOREIGN KEY (ID_PAIS) REFERENCES PAIS(ID_PAIS) ON DELETE RESTRICT
);

-- Tabla COMUNA (Modificada para que apunte a REGION en vez de CIUDAD)
CREATE TABLE COMUNA (
    ID_COMUNA BIGSERIAL PRIMARY KEY,
    DESCRIPCION_COMUNA VARCHAR(30) NOT NULL,
    ID_REGION BIGINT NOT NULL,
    CONSTRAINT fk_comuna_region FOREIGN KEY (ID_REGION) REFERENCES REGION(ID_REGION) ON DELETE RESTRICT
);


-- Crear la tabla INER
CREATE TABLE INER (
    ID_INER VARCHAR(41) PRIMARY KEY, -- INER_(UUID) tendrá 41 caracteres (5 de INER_ + 36 del UUID)
    NOM_INER VARCHAR(30) NOT NULL,
    MAIL_INER VARCHAR(50) NOT NULL,
    PASS_INER VARCHAR(25) NOT NULL,
    ID_PAIS BIGINT NOT NULL,
    ID_REGION BIGINT NOT NULL,
    ID_COMUNA BIGINT NOT NULL,
    TELEFONO_INER VARCHAR(15),
    VALORACION_PROM_INER INT,
    FECHA_CREACION_INER DATE DEFAULT CURRENT_DATE, -- Usamos DATE y CURRENT_DATE en lugar de SYSDATE
    DESCR_PERFIL_INER VARCHAR(300),
    DIRECCION_INER VARCHAR(30),
    CONSTRAINT fk_iner_pais FOREIGN KEY (ID_PAIS) REFERENCES PAIS(ID_PAIS) ON DELETE RESTRICT,
    CONSTRAINT fk_iner_region FOREIGN KEY (ID_REGION) REFERENCES REGION(ID_REGION) ON DELETE RESTRICT,
    CONSTRAINT fk_iner_comuna FOREIGN KEY (ID_COMUNA) REFERENCES COMUNA(ID_COMUNA) ON DELETE RESTRICT
);

-- Crear la función para generar el ID_INER
CREATE OR REPLACE FUNCTION generar_id_iner()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ID_INER = 'INER_' || gen_random_uuid()::TEXT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger para generar el ID_INER automáticamente
CREATE TRIGGER trigger_generar_id_iner
BEFORE INSERT ON INER
FOR EACH ROW
EXECUTE FUNCTION generar_id_iner();


-- Crear la tabla CATEGORIA
CREATE TABLE CATEGORIA (
    ID_CATEGORIA BIGSERIAL PRIMARY KEY, -- BIGSERIAL genera valores únicos automáticamente
    DESCRIPCION_CATEGORIA VARCHAR(30) NOT NULL
);


-- ---------------------------------------------

-- Insertar el país Chile
INSERT INTO PAIS (DESCRIPCION_PAIS) VALUES ('Chile');

-- Obtener el ID de Chile (esto lo puedes hacer manualmente o a través de una consulta posterior)
-- Insertar las regiones de Chile
INSERT INTO REGION (DESCRIPCION_REGION, ID_PAIS) VALUES 
    ('Arica y Parinacota', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Tarapacá', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Antofagasta', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Atacama', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Coquimbo', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Valparaíso', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Metropolitana de Santiago', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Libertador General Bernardo O’Higgins', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Maule', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Ñuble', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Biobío', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('La Araucanía', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Los Ríos', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Los Lagos', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Aysén del General Carlos Ibáñez del Campo', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile')),
    ('Magallanes y de la Antártica Chilena', (SELECT ID_PAIS FROM PAIS WHERE DESCRIPCION_PAIS = 'Chile'));


    -- Insertar las comunas de Arica y Parinacota
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Arica', 1),
    ('Camarones', 1),
    ('Putre', 1),
    ('General Lagos', 1);

-- Insertar las comunas de Tarapacá
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Iquique', 2),
    ('Alto Hospicio', 2),
    ('Pozo Almonte', 2),
    ('Camiña', 2),
    ('Colchane', 2),
    ('Huara', 2),
    ('Pica', 2);

-- Insertar las comunas de Antofagasta
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Antofagasta', 3),
    ('Mejillones', 3),
    ('Sierra Gorda', 3),
    ('Taltal', 3),
    ('Calama', 3),
    ('Ollagüe', 3),
    ('San Pedro de Atacama', 3),
    ('María Elena', 3),
    ('Tocopilla', 3);


-- Insertar las comunas de Atacama
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Chañaral', 4),
    ('Diego de Almagro', 4),
    ('Copiapó', 4),
    ('Caldera', 4),
    ('Tierra Amarilla', 4),
    ('Vallenar', 4),
    ('Alto del Carmen', 4),
    ('Freirina', 4),
    ('Huasco', 4);

-- Insertar las comunas de Coquimbo
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Andacollo', 5),
    ('Canela', 5),
    ('Combarbalá', 5),
    ('Coquimbo', 5),
    ('Illapel', 5),
    ('La Higuera', 5),
    ('La Serena', 5),
    ('Los Vilos', 5),
    ('Monte Patria', 5),
    ('Ovalle', 5),
    ('Paihuano', 5),
    ('Punitaqui', 5),
    ('Río Hurtado', 5),
    ('Salamanca', 5),
    ('Vicuña', 5);


-- Insertar las comunas de la Región de Valparaíso
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Valparaíso', 6),
    ('Viña del Mar', 6),
    ('Concón', 6),
    ('Quintero', 6),
    ('Puchuncaví', 6),
    ('Casablanca', 6),
    ('Juan Fernández', 6),
    ('Limache', 6),
    ('Olmué', 6),
    ('Quilpué', 6),
    ('Villa Alemana', 6),
    ('Los Andes', 6),
    ('Calle Larga', 6),
    ('Rinconada', 6),
    ('San Esteban', 6),
    ('Quillota', 6),
    ('La Calera', 6),
    ('La Cruz', 6),
    ('Nogales', 6),
    ('La Ligua', 6),
    ('Cabildo', 6),
    ('Papudo', 6),
    ('Petorca', 6),
    ('Zapallar', 6),
    ('San Antonio', 6),
    ('Algarrobo', 6),
    ('Cartagena', 6),
    ('El Quisco', 6),
    ('El Tabo', 6),
    ('Santo Domingo', 6),
    ('San Felipe', 6),
    ('Catemu', 6),
    ('Llay-Llay', 6),
    ('Panquehue', 6),
    ('Putaendo', 6),
    ('Santa María', 6),
    ('Isla de Pascua', 6);


-- Insertar las comunas de la Región Metropolitana
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    ('Santiago', 7),
    ('Cerrillos', 7),
    ('Cerro Navia', 7),
    ('Conchalí', 7),
    ('El Bosque', 7),
    ('Estación Central', 7),
    ('Huechuraba', 7),
    ('Independencia', 7),
    ('La Cisterna', 7),
    ('La Florida', 7),
    ('La Granja', 7),
    ('La Pintana', 7),
    ('La Reina', 7),
    ('Las Condes', 7),
    ('Lo Barnechea', 7),
    ('Lo Espejo', 7),
    ('Lo Prado', 7),
    ('Macul', 7),
    ('Maipú', 7),
    ('Ñuñoa', 7),
    ('Pedro Aguirre Cerda', 7),
    ('Peñalolén', 7),
    ('Providencia', 7),
    ('Pudahuel', 7),
    ('Quilicura', 7),
    ('Quinta Normal', 7),
    ('Recoleta', 7),
    ('Renca', 7),
    ('San Joaquín', 7),
    ('San Miguel', 7),
    ('San Ramón', 7),
    ('Vitacura', 7),
    ('Colina', 7),
    ('Lampa', 7),
    ('Til Til', 7),
    ('Pirque', 7),
    ('Puente Alto', 7),
    ('San José de Maipo', 7),
    ('Buin', 7),
    ('Calera de Tango', 7),
    ('Paine', 7),
    ('San Bernardo', 7),
    ('Alhué', 7),
    ('Curacaví', 7),
    ('María Pinto', 7),
    ('Melipilla', 7),
    ('San Pedro', 7),
    ('El Monte', 7),
    ('Isla de Maipo', 7),
    ('Padre Hurtado', 7),
    ('Peñaflor', 7),
    ('Talagante', 7);

-- Insertar las comunas de la Región del Libertador General Bernardo O'Higgins
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Cachapoal
    ('Codegua', 8),
    ('Coinco', 8),
    ('Coltauco', 8),
    ('Doñihue', 8),
    ('Graneros', 8),
    ('Las Cabras', 8),
    ('Machalí', 8),
    ('Malloa', 8),
    ('Mostazal', 8),
    ('Olivar', 8),
    ('Peumo', 8),
    ('Pichidegua', 8),
    ('Quinta de Tilcoco', 8),
    ('Rancagua', 8),
    ('Rengo', 8),
    ('Requínoa', 8),
    ('San Vicente de Tagua Tagua', 8),
    -- Provincia de Cardenal Caro
    ('La Estrella', 8),
    ('Litueche', 8),
    ('Marchigüe', 8),
    ('Navidad', 8),
    ('Paredones', 8),
    ('Pichilemu', 8),
    -- Provincia de Colchagua
    ('Chépica', 8),
    ('Chimbarongo', 8),
    ('Lolol', 8),
    ('Nancagua', 8),
    ('Palmilla', 8),
    ('Peralillo', 8),
    ('Placilla', 8),
    ('Pumanque', 8),
    ('San Fernando', 8),
    ('Santa Cruz', 8);


-- Insertar las comunas de la Región del Maule
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Talca
    ('Talca', 9),
    ('Constitución', 9),
    ('Curepto', 9),
    ('Empedrado', 9),
    ('Pencahue', 9),
    ('Río Claro', 9),
    ('San Clemente', 9),
    ('San Rafael', 9),
    -- Provincia de Curicó
    ('Curicó', 9),
    ('Molina', 9),
    ('Rauco', 9),
    ('Romeral', 9),
    ('Sagrada Familia', 9),
    ('Teno', 9),
    ('Vichuquén', 9),
    -- Provincia de Linares
    ('Linares', 9),
    ('Colbún', 9),
    ('Longaví', 9),
    ('Parral', 9),
    ('Retiro', 9),
    ('San Javier', 9),
    ('Villa Alegre', 9),
    ('Yerbas Buenas', 9),
    -- Provincia de Cauquenes
    ('Cauquenes', 9),
    ('Chanco', 9),
    ('Pelluhue', 9),
    ('Curanipe', 9),
    ('Tregualemu', 9);


-- Insertar las comunas de la Región de Ñuble
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Itata
    ('Cobquecura', 10),
    ('Coelemu', 10),
    ('Ninhue', 10),
    ('Portezuelo', 10),
    ('Quirihue', 10),
    ('Ránquil', 10),
    ('Trehuaco', 10),
    -- Provincia de Diguillín
    ('Bulnes', 10),
    ('Chillán Viejo', 10),
    ('Chillán', 10),
    ('El Carmen', 10),
    ('Pemuco', 10),
    ('Pinto', 10),
    ('Quillón', 10),
    ('San Ignacio', 10),
    ('Yungay', 10),
    -- Provincia de Punilla
    ('San Carlos', 10),
    ('Coihueco', 10),
    ('Ñiquén', 10),
    ('San Fabián', 10),
    ('San Nicolás', 10);


-- Insertar las comunas de la Región del Biobío
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Arauco
    ('Arauco', 11),
    ('Cañete', 11),
    ('Contulmo', 11),
    ('Curanilahue', 11),
    ('Lebu', 11),
    ('Los Álamos', 11),
    ('Tirúa', 11),
    -- Provincia de Biobío
    ('Alto Biobío', 11),
    ('Antuco', 11),
    ('Cabrero', 11),
    ('Laja', 11),
    ('Los Ángeles', 11),
    ('Mulchén', 11),
    ('Nacimiento', 11),
    ('Negrete', 11),
    ('Quilaco', 11),
    ('Quilleco', 11),
    ('San Rosendo', 11),
    ('Santa Bárbara', 11),
    ('Tucapel', 11),
    ('Yumbel', 11),
    -- Provincia de Concepción
    ('Chiguayante', 11),
    ('Concepción', 11),
    ('Coronel', 11),
    ('Florida', 11),
    ('Hualpén', 11),
    ('Hualqui', 11),
    ('Lota', 11),
    ('Penco', 11),
    ('San Pedro de la Paz', 11),
    ('Santa Juana', 11),
    ('Talcahuano', 11),
    ('Tomé', 11);

-- Insertar las comunas de la Región de La Araucanía
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Cautín
    ('Carahue', 12),
    ('Cholchol', 12),
    ('Cunco', 12),
    ('Curarrehue', 12),
    ('Freire', 12),
    ('Galvarino', 12),
    ('Gorbea', 12),
    ('Lautaro', 12),
    ('Loncoche', 12),
    ('Melipeuco', 12),
    ('Nueva Imperial', 12),
    ('Padre Las Casas', 12),
    ('Perquenco', 12),
    ('Pitrufquén', 12),
    ('Pucón', 12),
    ('Puerto Saavedra', 12),
    ('Temuco', 12),
    ('Teodoro Schmidt', 12),
    ('Toltén', 12),
    ('Vilcún', 12),
    ('Villarrica', 12),
    ('Cholchol', 12),
    -- Provincia de Malleco
    ('Angol', 12),
    ('Collipulli', 12),
    ('Curacautín', 12),
    ('Ercilla', 12),
    ('Lonquimay', 12),
    ('Los Sauces', 12),
    ('Lumaco', 12),
    ('Purén', 12),
    ('Renaico', 12),
    ('Traiguén', 12),
    ('Victoria', 12);


-- Insertar las comunas de la Región de Los Ríos
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Valdivia
    ('Valdivia', 13),
    ('Mariquina', 13),
    ('Lanco', 13),
    ('Máfil', 13),
    ('Los Lagos', 13),
    ('Paillaco', 13),
    ('Panguipulli', 13),
    ('Corral', 13),
    -- Provincia del Ranco
    ('La Unión', 13),
    ('Río Bueno', 13),
    ('Lago Ranco', 13),
    ('Futrono', 13);

-- Insertar las comunas de la Región de Los Lagos
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Chiloé
    ('Ancud', 14),
    ('Castro', 14),
    ('Chonchi', 14),
    ('Curaco de Vélez', 14),
    ('Dalcahue', 14),
    ('Puqueldón', 14),
    ('Queilén', 14),
    ('Quemchi', 14),
    ('Quellón', 14),
    ('Quinchao', 14),
    -- Provincia de Llanquihue
    ('Calbuco', 14),
    ('Cochamó', 14),
    ('Fresia', 14),
    ('Frutillar', 14),
    ('Llanquihue', 14),
    ('Los Muermos', 14),
    ('Maullín', 14),
    ('Puerto Montt', 14),
    ('Puerto Varas', 14),
    -- Provincia de Osorno
    ('Osorno', 14),
    ('Puerto Octay', 14),
    ('Purranque', 14),
    ('Puyehue', 14),
    ('Río Negro', 14),
    ('San Juan de la Costa', 14),
    ('San Pablo', 14),
    -- Provincia de Palena
    ('Chaitén', 14),
    ('Futaleufú', 14),
    ('Hualaihué', 14),
    ('Palena', 14);

-- Insertar las comunas de la Región de Aysén
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Aysén
    ('Aysén', 15),
    ('Cisnes', 15),
    ('Guaitecas', 15),
    -- Provincia de Capitán Prat
    ('Cochrane', 15),
    ('O''Higgins', 15),  -- Corregido con dos comillas simples
    ('Tortel', 15),
    -- Provincia de Coyhaique
    ('Coyhaique', 15),
    ('Lago Verde', 15),
    -- Provincia de General Carrera
    ('Chile Chico', 15),
    ('Río Ibáñez', 15);

    -- Insertar las comunas de la Región de Magallanes y de la Antártica Chilena
INSERT INTO COMUNA (DESCRIPCION_COMUNA, ID_REGION) VALUES
    -- Provincia de Magallanes
    ('Punta Arenas', 16),
    ('Laguna Blanca', 16),
    ('Río Verde', 16),
    ('San Gregorio', 16),
    -- Provincia de Tierra del Fuego
    ('Porvenir', 16),
    ('Primavera', 16),
    ('Timaukel', 16),
    -- Provincia de Última Esperanza
    ('Natales', 16),
    ('Torres del Paine', 16),
    -- Provincia de Antártica Chilena
    ('Antártica', 16),
    ('Cabo de Hornos', 16);


