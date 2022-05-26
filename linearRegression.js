async function start() {

    //Instanciamos nuestro modelo secuencial
    const model = tf.sequential();

    //Creamos nuestra primer capa
    const hiddenLayer = tf.layers.dense({
        units: 2,
        inputShape: [1]
    });
    //Agregamos la capa al modelo
    model.add(hiddenLayer);


    //Creamos la capa de salida
    const output = tf.layers.dense({
        units: 1
    });
    //Agregamos la capa de salida a nuestro modelo
    model.add(output);


    //Compilamos nuestro modelo con un optimizador y una función de pérdida
    model.compile({
        optimizer: "sgd",
        loss: "meanSquaredError",
        metrics: ['accuracy']
    });

    //Declaramos nuestros tensores de entrenamiento
    const x = tf.tensor2d([
        [1],
        [2],
        [3]
    ]);
    const y = tf.tensor2d([
        [5],
        [7],
        [9]
    ]);


    //Declaramos la superficie de nuestra vista
    const surface = {
        name: 'Pérdida'
    };

    //Opciones para el entrenamieno
    const options = {
        shuffle: true,
        epochs: 50,
        callbacks: tfvis.show.fitCallbacks(surface, ['loss', 'acc'])
    }

    //Entrenamos nuestro modelo
    const respuesta = await model.fit(x, y, options);

    return model
}

//Luego haremos nuestra predicción con nuevos datos de entrada
start().then((model) => {

    //Nuevos datos de entrada
    const entrada = tf.tensor2d([
        [3],
        [5],
        [4]
    ]);

    //Predicción
    const salida = model.predict(entrada);
    salida.print();
});