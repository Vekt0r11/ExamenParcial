// const { tf } = require("@tensorflow/tfjs-converter/dist/executor/graph_model")

let min = 1
let max = 10
let matrix1 = new Array()
let matrix2 = new Array()
let matrix3
let count = 0;
//Gen numero aleatorio
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Carga de matrices
function loadMatrix(matrix) {

    let randomN1 = generateRandomNumber(min, max)
    let randomN2 = generateRandomNumber(min, max)
    // console.log(randomN1, randomN2)

    for (let i = 0; i < randomN1; i++) {
        matrix[i] = []
        for (let j = 0; j < randomN2; j++) {

            //Cargar valores con inputs
            matrix[i][j] = generateRandomNumber(min, max)
        }
    }
    return matrix
}

//Calculo de dimension de matrices
function matrixSize(matrix) {
    let rowCount = matrix.length
    let rowSizes = []
    for (let i = 0; i < rowCount; i++) {
        rowSizes.push(matrix[i].length)
    }

    return [rowCount, Math.min.apply(null, rowSizes)]
}

//Verificación y producto de matrices
function matrixProduct() {

    matrix1 = [
        [12,16,3],
        [2,6,8],
        [9,10,0]
    ];
    matrix2 = [
        [2,2,2],
        [2,2,2],
        [2,2,2]
    ];

    let matrixSize1 = matrixSize(matrix1)
    let matrixSize2 = matrixSize(matrix2)

    //Verificacion si las matrices son compatibles
    if (matrixSize1[1] == matrixSize2[0]) {

        console.log("Dimensión de primer matriz [" + matrixSize1 + "]")
        console.log("Dimensión de segunda matriz [" + matrixSize1 + "]")

        //Generación de matriz resultado
        matrix3 = new Array(matrixSize1[0])
        for (let i = 0; i < matrix3.length; i++) {
            matrix3[i] = new Array(matrixSize2[1]).fill(0);
        }
        //Producto de matrices
        for (i = 0; i < matrix3.length; i++) {
            for (j = 0; j < matrix3[i].length; j++) {
                for (k = 0; k < matrixSize1[1]; k++) {
                    matrix3[i][j] = matrix3[i][j] + matrix1[i][k] * matrix2[k][j];
                }
            }
        }
        console.log(matrix1)
        console.log(matrix2)

        console.log(matrix3)

        matrixProductTF(matrix1, matrix2);
    }
}
matrixProduct()

function matrixProductTF(matrix1, matrix2) {

    const resultadoTF = tf.matMul(matrix1,matrix2);

    console.log('Resultado usando TensorFlow')
    console.log(resultadoTF.dataSync())
}