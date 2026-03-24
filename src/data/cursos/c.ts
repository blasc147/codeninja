export interface Lesson {
  num: number;
  slug: string;
  title: string;
  desc: string;
  objetivo: string;
  sections: Section[];
}

interface Section {
  title: string;
  body: string;    // markdown-ish text, rendered as paragraphs
  code?: string;   // C code example
  note?: string;   // tip / warning box
}

export const COURSE = {
  title: 'Programación en C',
  slug: 'c',
  badge: 'Noob',
  desc: 'Domina el lenguaje C desde cero: variables, control de flujo, funciones, punteros y estructuras de datos.',
};

export const LESSONS: Lesson[] = [
  {
    num: 1,
    slug: '1-introduccion-y-estructura',
    title: 'Introducción y Estructura',
    desc: 'Qué es C, para qué se usa y cómo se estructura un programa.',
    objetivo: 'Entender el origen del lenguaje C y escribir tu primer programa.',
    sections: [
      {
        title: '¿Qué es C?',
        body: 'C es un lenguaje de programación de propósito general creado por Dennis Ritchie en los años 70. Es el padre de muchos lenguajes modernos (C++, Java, Python). Se usa en sistemas operativos, drivers, microcontroladores y aplicaciones de alto rendimiento.',
      },
      {
        title: 'Estructura básica de un programa',
        body: 'Todo programa en C tiene al menos una función llamada main(). El preprocesador (#include) incorpora bibliotecas. Las instrucciones terminan con punto y coma.',
        code: `#include <stdio.h>

int main() {
    printf("¡Hola, mundo!\\n");
    return 0;
}`,
        note: 'El \\n dentro de printf inserta un salto de línea. El return 0 indica que el programa terminó correctamente.',
      },
      {
        title: 'Compilación y ejecución',
        body: 'C es un lenguaje compilado. El código fuente (.c) se transforma en un ejecutable mediante un compilador como GCC. El ciclo es: escribir → compilar → ejecutar.',
        code: `// Compilar con GCC:
// gcc programa.c -o programa

// Ejecutar:
// ./programa`,
      },
    ],
  },
  {
    num: 2,
    slug: '2-procesos-y-estados',
    title: 'Procesos y Estados',
    desc: 'Cómo el sistema operativo ejecuta programas y los estados de un proceso.',
    objetivo: 'Comprender qué ocurre cuando se ejecuta un programa C a nivel del sistema.',
    sections: [
      {
        title: '¿Qué es un proceso?',
        body: 'Un proceso es un programa en ejecución. Cuando corrés tu programa C, el sistema operativo lo carga en memoria, le asigna recursos (CPU, RAM) y lo pone en estado "listo" para ejecutarse.',
      },
      {
        title: 'Estados de un proceso',
        body: 'Un proceso pasa por distintos estados: Nuevo (se está creando), Listo (espera CPU), En ejecución (usa la CPU), Bloqueado (espera un recurso), Terminado (finalizó).',
        note: 'El return 0 al final del main() indica al SO que el proceso terminó correctamente. Un valor distinto de 0 indica error.',
      },
      {
        title: 'Código de retorno',
        body: 'Podés usar distintos valores de retorno para indicar qué ocurrió en tu programa.',
        code: `#include <stdio.h>

int main() {
    printf("Proceso ejecutándose...\\n");
    // El sistema operativo recibe este valor
    return 0;  // 0 = éxito
}`,
      },
    ],
  },
  {
    num: 3,
    slug: '3-variables-y-constantes',
    title: 'Variables y Constantes',
    desc: 'Cómo declarar, inicializar y usar variables y constantes en C.',
    objetivo: 'Declarar variables de distintos tipos y entender la diferencia con las constantes.',
    sections: [
      {
        title: 'Variables',
        body: 'Una variable es un espacio en memoria con un nombre y un tipo. En C hay que declarar el tipo antes de usar la variable. Los tipos básicos son: int (entero), float (decimal), char (carácter), double (decimal de doble precisión).',
        code: `#include <stdio.h>

int main() {
    int edad = 20;
    float altura = 1.75;
    char inicial = 'B';
    double pi = 3.14159265;

    printf("Edad: %d\\n", edad);
    printf("Altura: %.2f\\n", altura);
    printf("Inicial: %c\\n", inicial);
    return 0;
}`,
      },
      {
        title: 'Constantes',
        body: 'Una constante no cambia su valor durante la ejecución. Se definen con #define o con la palabra clave const.',
        code: `#include <stdio.h>

#define PI 3.14159
#define MAX 100

int main() {
    const int EDAD_MINIMA = 18;
    float radio = 5.0;
    float area = PI * radio * radio;

    printf("Área del círculo: %.2f\\n", area);
    printf("Edad mínima: %d\\n", EDAD_MINIMA);
    return 0;
}`,
        note: 'Por convención, las constantes se escriben en MAYÚSCULAS para diferenciarlas de las variables.',
      },
      {
        title: 'Especificadores de formato',
        body: 'printf usa especificadores para indicar el tipo de dato: %d (int), %f (float), %c (char), %s (string), %lf (double).',
      },
    ],
  },
  {
    num: 4,
    slug: '4-entrada-y-salida',
    title: 'Entrada y Salida',
    desc: 'Cómo mostrar datos en pantalla y leer datos del usuario.',
    objetivo: 'Usar printf y scanf para interactuar con el usuario.',
    sections: [
      {
        title: 'Salida con printf',
        body: 'printf es la función estándar para mostrar texto. Acepta un formato y variables.',
        code: `#include <stdio.h>

int main() {
    int num = 42;
    printf("El número es: %d\\n", num);
    printf("Pi aproximado: %.4f\\n", 3.14159);
    printf("Letra: %c\\n", 'A');
    return 0;
}`,
      },
      {
        title: 'Entrada con scanf',
        body: 'scanf lee datos desde el teclado. Recibe el formato y la dirección de memoria de la variable (con &).',
        code: `#include <stdio.h>

int main() {
    int edad;
    float altura;

    printf("Ingresá tu edad: ");
    scanf("%d", &edad);

    printf("Ingresá tu altura (metros): ");
    scanf("%f", &altura);

    printf("Tenés %d años y medís %.2f m\\n", edad, altura);
    return 0;
}`,
        note: 'El & delante de la variable es obligatorio en scanf. Indica la dirección de memoria donde guardar el dato.',
      },
    ],
  },
  {
    num: 5,
    slug: '5-tipos-de-datos-y-operadores',
    title: 'Tipos de Datos y Operadores',
    desc: 'Tipos de datos en C y operadores aritméticos, relacionales y lógicos.',
    objetivo: 'Usar distintos tipos de datos y realizar operaciones con ellos.',
    sections: [
      {
        title: 'Tipos de datos',
        body: 'C tiene tipos básicos: char (1 byte), int (4 bytes), float (4 bytes), double (8 bytes). Con short, long, unsigned podés modificar el rango.',
        code: `#include <stdio.h>

int main() {
    short s = 100;
    unsigned int u = 4000000000U;
    long long ll = 9000000000LL;

    printf("short: %d\\n", s);
    printf("unsigned int: %u\\n", u);
    printf("long long: %lld\\n", ll);
    return 0;
}`,
      },
      {
        title: 'Operadores aritméticos',
        body: 'Los operadores básicos son: + (suma), - (resta), * (multiplicación), / (división), % (módulo/resto).',
        code: `#include <stdio.h>

int main() {
    int a = 10, b = 3;

    printf("Suma:        %d\\n", a + b);
    printf("Resta:       %d\\n", a - b);
    printf("Producto:    %d\\n", a * b);
    printf("División:    %d\\n", a / b);   // división entera
    printf("Módulo:      %d\\n", a % b);   // resto

    float fa = 10.0, fb = 3.0;
    printf("División f:  %.2f\\n", fa / fb); // 3.33
    return 0;
}`,
      },
      {
        title: 'Operadores relacionales y lógicos',
        body: 'Relacionales: == (igual), != (distinto), > < >= <=. Lógicos: && (AND), || (OR), ! (NOT). Devuelven 1 (verdadero) o 0 (falso).',
        code: `#include <stdio.h>

int main() {
    int x = 5;
    printf("%d\\n", x > 3);          // 1
    printf("%d\\n", x == 10);        // 0
    printf("%d\\n", x > 3 && x < 10); // 1
    return 0;
}`,
      },
    ],
  },
  {
    num: 6,
    slug: '6-sentencias-de-decision',
    title: 'Sentencias de Decisión',
    desc: 'Control de flujo con if, else y switch para tomar decisiones.',
    objetivo: 'Escribir programas que ejecuten distintas acciones según condiciones.',
    sections: [
      {
        title: 'if / else',
        body: 'La sentencia if evalúa una condición. Si es verdadera ejecuta el bloque. else es opcional y se ejecuta si la condición es falsa.',
        code: `#include <stdio.h>

int main() {
    int nota;
    printf("Ingresá tu nota: ");
    scanf("%d", &nota);

    if (nota >= 6) {
        printf("¡Aprobaste!\\n");
    } else if (nota >= 4) {
        printf("Recuperatorio.\\n");
    } else {
        printf("Desaprobaste.\\n");
    }
    return 0;
}`,
      },
      {
        title: 'switch',
        body: 'switch es útil cuando tenés múltiples opciones basadas en un valor entero o char. Cada caso termina con break.',
        code: `#include <stdio.h>

int main() {
    int dia;
    printf("Ingresá el número de día (1-7): ");
    scanf("%d", &dia);

    switch (dia) {
        case 1: printf("Lunes\\n");    break;
        case 2: printf("Martes\\n");   break;
        case 3: printf("Miércoles\\n");break;
        case 6:
        case 7: printf("Fin de semana\\n"); break;
        default: printf("Día inválido\\n");
    }
    return 0;
}`,
        note: 'Sin el break, la ejecución "cae" al siguiente caso (fall-through). Esto puede ser intencional (como en el ejemplo para casos 6 y 7).',
      },
    ],
  },
  {
    num: 7,
    slug: '7-sentencias-de-iteracion',
    title: 'Sentencias de Iteración',
    desc: 'Bucles while, do-while y for para repetir acciones.',
    objetivo: 'Escribir bucles para repetir bloques de código de distintas formas.',
    sections: [
      {
        title: 'while',
        body: 'El bucle while repite mientras la condición sea verdadera. Si es falsa desde el inicio, el bloque no se ejecuta.',
        code: `#include <stdio.h>

int main() {
    int i = 1;
    while (i <= 5) {
        printf("%d\\n", i);
        i++;
    }
    return 0;
}`,
      },
      {
        title: 'do-while',
        body: 'do-while garantiza que el bloque se ejecuta al menos una vez, ya que la condición se evalúa al final.',
        code: `#include <stdio.h>

int main() {
    int num;
    do {
        printf("Ingresá un número positivo: ");
        scanf("%d", &num);
    } while (num <= 0);

    printf("Ingresaste: %d\\n", num);
    return 0;
}`,
      },
      {
        title: 'for',
        body: 'El bucle for es ideal cuando sabés cuántas veces repetir. Tiene inicialización, condición e incremento en una sola línea.',
        code: `#include <stdio.h>

int main() {
    // Tabla del 5
    for (int i = 1; i <= 10; i++) {
        printf("5 x %2d = %2d\\n", i, 5 * i);
    }
    return 0;
}`,
        note: 'Podés usar break para salir del bucle anticipadamente y continue para saltar a la siguiente iteración.',
      },
    ],
  },
  {
    num: 8,
    slug: '8-arreglos',
    title: 'Arreglos (Vectores y Matrices)',
    desc: 'Almacenar múltiples valores del mismo tipo con vectores y matrices.',
    objetivo: 'Declarar, inicializar y recorrer arreglos unidimensionales y bidimensionales.',
    sections: [
      {
        title: 'Vectores (arrays 1D)',
        body: 'Un vector es una secuencia de elementos del mismo tipo. Se declara con tipo nombre[tamaño]. Los índices van de 0 a tamaño-1.',
        code: `#include <stdio.h>

int main() {
    int notas[5] = {8, 6, 9, 7, 10};
    int suma = 0;

    for (int i = 0; i < 5; i++) {
        suma += notas[i];
        printf("Nota %d: %d\\n", i + 1, notas[i]);
    }

    printf("Promedio: %.1f\\n", (float)suma / 5);
    return 0;
}`,
      },
      {
        title: 'Matrices (arrays 2D)',
        body: 'Una matriz es un arreglo de dos dimensiones. Se accede con dos índices: fila y columna.',
        code: `#include <stdio.h>

int main() {
    int matriz[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matriz[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
        note: 'El tamaño del arreglo debe ser conocido en tiempo de compilación. Para tamaños dinámicos usaremos malloc() más adelante.',
      },
    ],
  },
  {
    num: 9,
    slug: '9-cadenas-de-caracteres',
    title: 'Cadenas de Caracteres',
    desc: 'Trabajar con texto: declaración, entrada/salida y funciones de string.h.',
    objetivo: 'Declarar y manipular cadenas de caracteres usando la librería string.h.',
    sections: [
      {
        title: 'Qué es un string en C',
        body: 'En C no existe un tipo string nativo. Un string es un array de char que termina con el carácter nulo \\0. Siempre hay que reservar un espacio extra para ese terminador.',
        code: `#include <stdio.h>

int main() {
    char nombre[20] = "CodeNinja";
    char apellido[20];

    printf("Nombre: %s\\n", nombre);

    printf("Ingresá tu apellido: ");
    scanf("%19s", apellido);  // limita a 19 chars + \\0
    printf("Hola, %s\\n", apellido);
    return 0;
}`,
      },
      {
        title: 'Funciones de string.h',
        body: 'La librería string.h tiene funciones útiles: strlen (longitud), strcpy (copiar), strcat (concatenar), strcmp (comparar), strcmpi (comparar sin mayúsculas).',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[50] = "Hola";
    char s2[] = " Mundo";

    printf("Longitud: %zu\\n", strlen(s1));    // 4
    strcat(s1, s2);
    printf("Concatenado: %s\\n", s1);           // Hola Mundo

    if (strcmp("abc", "abc") == 0) {
        printf("Son iguales\\n");
    }
    return 0;
}`,
        note: 'Nunca hagas s1 = s2 para copiar strings. Usá strcpy(s1, s2). La asignación directa solo copia el puntero.',
      },
    ],
  },
  {
    num: 10,
    slug: '10-busqueda-y-ordenamiento',
    title: 'Búsqueda y Ordenamiento',
    desc: 'Algoritmos clásicos: búsqueda lineal, binaria y ordenamiento burbuja.',
    objetivo: 'Implementar búsqueda lineal, binaria y ordenamiento burbuja en vectores.',
    sections: [
      {
        title: 'Búsqueda Lineal',
        body: 'Recorre el arreglo elemento por elemento hasta encontrar el valor o llegar al final. Complejidad O(n).',
        code: `#include <stdio.h>

int busquedaLineal(int arr[], int n, int valor) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == valor) return i;
    }
    return -1;
}

int main() {
    int nums[] = {5, 3, 8, 1, 9, 2};
    int pos = busquedaLineal(nums, 6, 8);

    if (pos != -1)
        printf("Encontrado en posición %d\\n", pos);
    else
        printf("No encontrado\\n");
    return 0;
}`,
      },
      {
        title: 'Ordenamiento Burbuja',
        body: 'Compara pares adyacentes y los intercambia si están en orden incorrecto. Simple pero O(n²). Útil para aprender el concepto.',
        code: `#include <stdio.h>

void burbuja(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j]   = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int nums[] = {64, 34, 25, 12, 22, 11, 90};
    burbuja(nums, 7);
    for (int i = 0; i < 7; i++)
        printf("%d ", nums[i]);
    printf("\\n");
    return 0;
}`,
      },
    ],
  },
  {
    num: 11,
    slug: '11-funciones-y-recursividad',
    title: 'Funciones y Recursividad',
    desc: 'Modularizar código con funciones y resolver problemas con recursividad.',
    objetivo: 'Crear funciones con parámetros y retorno, y entender la recursividad.',
    sections: [
      {
        title: 'Funciones',
        body: 'Una función agrupa código reutilizable. Se define con tipo_retorno nombre(parámetros). Si no retorna nada, el tipo es void.',
        code: `#include <stdio.h>

int maximo(int a, int b) {
    return (a > b) ? a : b;
}

void saludar(char nombre[]) {
    printf("¡Hola, %s!\\n", nombre);
}

int main() {
    printf("Máximo: %d\\n", maximo(10, 25));
    saludar("CodeNinja");
    return 0;
}`,
      },
      {
        title: 'Recursividad',
        body: 'Una función recursiva se llama a sí misma. Debe tener un caso base (cuando deja de llamarse) y un caso recursivo.',
        code: `#include <stdio.h>

// Factorial: n! = n * (n-1)!
long factorial(int n) {
    if (n <= 1) return 1;         // caso base
    return n * factorial(n - 1);  // caso recursivo
}

// Fibonacci
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("5! = %ld\\n", factorial(5));     // 120
    printf("Fib(8) = %d\\n", fibonacci(8)); // 21
    return 0;
}`,
        note: 'Cuidado con la recursividad infinita: siempre asegurate de que el caso base sea alcanzable.',
      },
    ],
  },
  {
    num: 12,
    slug: '12-estructuras',
    title: 'Estructuras',
    desc: 'Agrupar datos de distintos tipos con struct.',
    objetivo: 'Definir y usar structs para modelar entidades del mundo real.',
    sections: [
      {
        title: 'Definir y usar una struct',
        body: 'Una struct agrupa campos de distintos tipos bajo un mismo nombre. Se accede a los campos con el operador punto (.).',
        code: `#include <stdio.h>
#include <string.h>

struct Alumno {
    char nombre[50];
    int legajo;
    float promedio;
};

int main() {
    struct Alumno a1;
    strcpy(a1.nombre, "Juan Pérez");
    a1.legajo  = 12345;
    a1.promedio = 8.5;

    printf("Nombre:   %s\\n", a1.nombre);
    printf("Legajo:   %d\\n", a1.legajo);
    printf("Promedio: %.1f\\n", a1.promedio);
    return 0;
}`,
      },
      {
        title: 'Array de estructuras',
        body: 'Podés crear arreglos de structs para manejar colecciones de datos estructurados.',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nombre[50];
    float nota;
} Alumno;

int main() {
    Alumno clase[3] = {
        {"Ana",   9.0},
        {"Carlos", 7.5},
        {"María",  8.0},
    };

    for (int i = 0; i < 3; i++) {
        printf("%s: %.1f\\n", clase[i].nombre, clase[i].nota);
    }
    return 0;
}`,
        note: 'typedef permite nombrar un struct para no tener que escribir struct Alumno cada vez, sino solo Alumno.',
      },
    ],
  },
  {
    num: 13,
    slug: '13-modularizacion',
    title: 'Modularización',
    desc: 'Organizar el código en archivos .c y .h separados.',
    objetivo: 'Dividir un programa en módulos con archivos de cabecera e implementación.',
    sections: [
      {
        title: 'Archivos de cabecera (.h)',
        body: 'Un archivo .h (header) declara las funciones y tipos que serán usados por otros módulos. El archivo .c contiene la implementación.',
        code: `// matematica.h
#ifndef MATEMATICA_H
#define MATEMATICA_H

int sumar(int a, int b);
int restar(int a, int b);
float dividir(float a, float b);

#endif`,
      },
      {
        title: 'Implementación (.c)',
        body: 'El archivo .c incluye su propio .h e implementa las funciones declaradas.',
        code: `// matematica.c
#include "matematica.h"

int sumar(int a, int b)         { return a + b; }
int restar(int a, int b)        { return a - b; }
float dividir(float a, float b) { return a / b; }

// main.c
#include <stdio.h>
#include "matematica.h"

int main() {
    printf("3 + 4 = %d\\n", sumar(3, 4));
    printf("10 / 3 = %.2f\\n", dividir(10, 3));
    return 0;
}`,
        note: 'Las guardas #ifndef evitan que el header se incluya más de una vez en la misma compilación.',
      },
    ],
  },
  {
    num: 14,
    slug: '14-listas-pilas-y-colas',
    title: 'Listas, Pilas y Colas',
    desc: 'Estructuras de datos dinámicas con punteros y memoria dinámica.',
    objetivo: 'Implementar una lista enlazada simple, una pila y una cola con punteros.',
    sections: [
      {
        title: 'Punteros y malloc',
        body: 'Un puntero almacena una dirección de memoria. malloc() reserva memoria dinámica en el heap. Siempre liberá la memoria con free().',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int *) malloc(sizeof(int));
    *p = 42;
    printf("Valor: %d\\n", *p);
    free(p);
    return 0;
}`,
      },
      {
        title: 'Lista enlazada simple',
        body: 'Una lista enlazada es una secuencia de nodos donde cada uno apunta al siguiente. Permite insertar y eliminar en O(1) al inicio.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *siguiente;
} Nodo;

Nodo* insertar(Nodo *lista, int valor) {
    Nodo *nuevo = (Nodo *) malloc(sizeof(Nodo));
    nuevo->dato      = valor;
    nuevo->siguiente = lista;
    return nuevo;
}

void imprimir(Nodo *lista) {
    while (lista != NULL) {
        printf("%d -> ", lista->dato);
        lista = lista->siguiente;
    }
    printf("NULL\\n");
}

int main() {
    Nodo *lista = NULL;
    lista = insertar(lista, 3);
    lista = insertar(lista, 7);
    lista = insertar(lista, 1);
    imprimir(lista);
    return 0;
}`,
        note: 'Siempre liberá todos los nodos con free() al final para evitar memory leaks.',
      },
    ],
  },
  {
    num: 15,
    slug: '15-arboles-binarios',
    title: 'Árboles Binarios',
    desc: 'Estructura jerárquica de datos: inserción, recorridos y búsqueda.',
    objetivo: 'Implementar un árbol binario de búsqueda con inserción y recorridos.',
    sections: [
      {
        title: 'Árbol Binario de Búsqueda (ABB)',
        body: 'Un ABB es un árbol donde cada nodo tiene a lo sumo dos hijos. El hijo izquierdo tiene valor menor, el derecho mayor. Permite búsqueda en O(log n) promedio.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *izq, *der;
} Nodo;

Nodo* insertar(Nodo *raiz, int valor) {
    if (raiz == NULL) {
        Nodo *n = (Nodo*) malloc(sizeof(Nodo));
        n->dato = valor; n->izq = n->der = NULL;
        return n;
    }
    if (valor < raiz->dato)
        raiz->izq = insertar(raiz->izq, valor);
    else
        raiz->der = insertar(raiz->der, valor);
    return raiz;
}

// Recorrido InOrden: izq → raíz → der (da los valores ordenados)
void inorden(Nodo *r) {
    if (r == NULL) return;
    inorden(r->izq);
    printf("%d ", r->dato);
    inorden(r->der);
}

int main() {
    Nodo *arbol = NULL;
    int vals[] = {5, 3, 7, 1, 4, 6, 8};
    for (int i = 0; i < 7; i++)
        arbol = insertar(arbol, vals[i]);

    printf("InOrden: ");
    inorden(arbol);
    printf("\\n");
    return 0;
}`,
      },
    ],
  },
  {
    num: 16,
    slug: '16-archivos',
    title: 'Archivos',
    desc: 'Leer y escribir datos en archivos de texto y binarios.',
    objetivo: 'Abrir, leer, escribir y cerrar archivos usando la librería stdio.h.',
    sections: [
      {
        title: 'Escribir en un archivo',
        body: 'fopen() abre (o crea) un archivo. El segundo argumento indica el modo: "w" (escribir), "r" (leer), "a" (agregar). Siempre cerrar con fclose().',
        code: `#include <stdio.h>

int main() {
    FILE *f = fopen("datos.txt", "w");
    if (f == NULL) {
        printf("Error al abrir el archivo\\n");
        return 1;
    }

    fprintf(f, "Nombre: CodeNinja\\n");
    fprintf(f, "Versión: 1\\n");
    fclose(f);
    printf("Archivo creado correctamente\\n");
    return 0;
}`,
      },
      {
        title: 'Leer de un archivo',
        body: 'fscanf() y fgets() leen datos de un archivo. feof() devuelve verdadero cuando se llegó al final.',
        code: `#include <stdio.h>

int main() {
    FILE *f = fopen("datos.txt", "r");
    if (f == NULL) {
        printf("No se encontró el archivo\\n");
        return 1;
    }

    char linea[100];
    while (fgets(linea, sizeof(linea), f) != NULL) {
        printf("%s", linea);
    }
    fclose(f);
    return 0;
}`,
        note: 'Siempre verificá que fopen() no devuelva NULL antes de usar el archivo. Un NULL indica que el archivo no pudo abrirse.',
      },
    ],
  },
];
