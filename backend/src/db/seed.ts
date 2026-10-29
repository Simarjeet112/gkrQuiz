import crypto from 'crypto';
import { getDB, IDatabase } from './connection.js';
import { initDatabase } from './init.js';
import { generateProceduralQuestions } from './proceduralQuestions.js';
import { footballLegendsQuestions } from './footballLegendsQuestions.js';

export const seedQuestions = [
  // ── EASY QUESTIONS (Q1–Q20) ─────────────────────────────────────────────────
  {
    text: 'Which data structure follows LIFO?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correct_answer: 'Stack',
    explanation:
      'LIFO stands for Last-In, First-Out. A Stack inserts and removes elements from the same end (top), so the last element pushed is the first to be popped.',
  },
  {
    text: 'What is the primary purpose of a function in programming?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To increase code repetition',
      'To organize reusable code',
      'To store only numbers',
      'To replace variables',
    ],
    correct_answer: 'To organize reusable code',
    explanation:
      'Functions encapsulate a block of logic under a name so it can be called multiple times from different parts of a program, reducing repetition and improving maintainability.',
  },
  {
    text: 'Which of the following is an example of a linear data structure?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Graph', 'Tree', 'Array', 'Binary Search Tree'],
    correct_answer: 'Array',
    explanation:
      'A linear data structure stores elements sequentially, one after another. Arrays store elements in contiguous memory with a single index per element. Graphs and Trees are non-linear.',
  },
  {
    text: 'What is the main purpose of a loop?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To repeat a block of instructions',
      'To terminate a program',
      'To declare a class',
      'To allocate memory permanently',
    ],
    correct_answer: 'To repeat a block of instructions',
    explanation:
      'Loops (for, while, do-while) allow a section of code to execute repeatedly either a fixed number of times or until a condition changes.',
  },
  {
    text: 'Which programming concept allows a class to inherit properties and methods from another class?',
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: ['Encapsulation', 'Inheritance', 'Abstraction', 'Compilation'],
    correct_answer: 'Inheritance',
    explanation:
      'Inheritance lets a child (derived) class acquire the attributes and behaviors defined in a parent (base) class, promoting code reuse and hierarchical class structures.',
  },
  {
    text: 'Which data structure follows FIFO?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Stack', 'Queue', 'Tree', 'Heap'],
    correct_answer: 'Queue',
    explanation:
      'FIFO stands for First-In, First-Out. A Queue inserts elements at the rear and removes them from the front, just like a physical queue/line.',
  },
  {
    text: 'What is the primary purpose of an algorithm?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To provide step-by-step instructions for solving a problem',
      'To store source code permanently',
      'To increase program size',
      'To replace a programming language',
    ],
    correct_answer: 'To provide step-by-step instructions for solving a problem',
    explanation:
      'An algorithm is a finite sequence of well-defined instructions that transforms input into the desired output, independent of any programming language.',
  },
  {
    text: 'Which of the following is a valid characteristic of a prime number?',
    difficulty: 'easy',
    category: 'Mathematics',
    code_snippet: null,
    options: [
      'It has exactly two positive divisors',
      'It is always even',
      'It is always greater than 10',
      'It is divisible by every integer',
    ],
    correct_answer: 'It has exactly two positive divisors',
    explanation:
      'A prime number has exactly two distinct positive divisors: 1 and itself. For example, 7 is divisible only by 1 and 7.',
  },
  {
    text: 'What is recursion?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'A function calling itself',
      'A loop that never terminates',
      'A class creating another class',
      'A variable storing multiple values',
    ],
    correct_answer: 'A function calling itself',
    explanation:
      'Recursion occurs when a function calls itself (directly or indirectly) as part of its own definition, breaking a problem into smaller instances until a base case is reached.',
  },
  {
    text: 'Which data structure is commonly used to implement an Undo operation?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Queue', 'Stack', 'Graph', 'Array only'],
    correct_answer: 'Stack',
    explanation:
      'Undo operations use a Stack: each action is pushed; undoing pops the most recent action and reverses it, exploiting the LIFO (Last-In, First-Out) property.',
  },
  {
    text: 'What is the primary purpose of a variable?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To store a value that a program can use',
      'To compile source code',
      'To execute an operating system',
      'To create an algorithm automatically',
    ],
    correct_answer: 'To store a value that a program can use',
    explanation:
      'A variable is a named location in memory that holds data which can be read or modified during program execution.',
  },
  {
    text: 'Which of the following is a sorting algorithm?',
    difficulty: 'easy',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Binary Search', 'Breadth-First Search', 'Merge Sort', 'Depth-First Search'],
    correct_answer: 'Merge Sort',
    explanation:
      'Merge Sort is a divide-and-conquer sorting algorithm. Binary Search is a search algorithm; BFS and DFS are graph traversal algorithms.',
  },
  {
    text: 'What is the purpose of a base case in recursion?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To increase the number of recursive calls',
      'To provide a stopping condition',
      'To sort the input',
      'To allocate an array',
    ],
    correct_answer: 'To provide a stopping condition',
    explanation:
      'The base case is a condition under which the recursive function returns without making another recursive call, preventing infinite recursion.',
  },
  {
    text: 'Which of these is a non-linear data structure?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Array', 'Stack', 'Queue', 'Tree'],
    correct_answer: 'Tree',
    explanation:
      'A Tree is a non-linear, hierarchical data structure where each node can have multiple children. Arrays, Stacks, and Queues are linear structures.',
  },
  {
    text: 'What is debugging?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'Finding and fixing errors in a program',
      'Converting code into a presentation',
      'Increasing the number of variables',
      'Writing comments only',
    ],
    correct_answer: 'Finding and fixing errors in a program',
    explanation:
      'Debugging is the systematic process of identifying, analyzing, and correcting defects (bugs) in software to make it behave as intended.',
  },
  {
    text: "Which OOP concept restricts direct access to an object's internal data?",
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: ['Inheritance', 'Encapsulation', 'Recursion', 'Iteration'],
    correct_answer: 'Encapsulation',
    explanation:
      'Encapsulation bundles data and the methods that operate on that data inside a class, and restricts external access through access modifiers (private, protected), exposing only a controlled public interface.',
  },
  {
    text: 'Which search algorithm requires sorted data to work correctly in its standard form?',
    difficulty: 'easy',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Linear Search', 'Binary Search', 'Sequential Search', 'Random Search'],
    correct_answer: 'Binary Search',
    explanation:
      'Binary Search halves the search space at each step by comparing the target to the middle element, which only produces correct results when the array is sorted.',
  },
  {
    text: 'What is the main purpose of a compiler?',
    difficulty: 'easy',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To translate source code into another representation, commonly machine code or intermediate code',
      'To design algorithms automatically',
      'To manage internet connections',
      'To store passwords',
    ],
    correct_answer:
      'To translate source code into another representation, commonly machine code or intermediate code',
    explanation:
      'A compiler takes high-level source code as input and translates it into a lower-level form (machine code, bytecode, etc.) that can be executed or further processed.',
  },
  {
    text: 'Which of the following best describes a class in OOP?',
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: [
      'A blueprint for creating objects',
      'A type of loop',
      'A sorting algorithm',
      'A database query',
    ],
    correct_answer: 'A blueprint for creating objects',
    explanation:
      'A class defines the structure (attributes) and behavior (methods) that its instances (objects) will have. It acts as a template from which objects are created.',
  },
  {
    text: 'What is the main advantage of using an array?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'It always stores different data types',
      'It provides efficient indexed access to elements',
      'It automatically sorts its elements',
      'It has unlimited capacity',
    ],
    correct_answer: 'It provides efficient indexed access to elements',
    explanation:
      'Arrays store elements in contiguous memory, so any element can be accessed in O(1) time using its index. This random-access property is their primary performance advantage.',
  },

  // ── MEDIUM QUESTIONS (Q21–Q40) ───────────────────────────────────────────────
  {
    text: 'What is function overloading?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'Defining multiple functions with the same name but different parameter lists',
      'Calling a function multiple times',
      'Defining functions with different names',
      'Calling one function from another',
    ],
    correct_answer: 'Defining multiple functions with the same name but different parameter lists',
    explanation:
      'Function overloading (compile-time polymorphism) lets you define several functions sharing the same name as long as their parameter lists differ in number or type of parameters.',
  },
  {
    text: 'What is the minimum number of moves required to solve the Tower of Hanoi puzzle with N disks?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['N²', '2N', '2ᴺ − 1', 'N!'],
    correct_answer: '2ᴺ − 1',
    explanation:
      'The recurrence T(N) = 2·T(N−1) + 1, T(1) = 1 gives T(N) = 2ᴺ − 1. Each disk requires moving all smaller disks twice (to the auxiliary peg and back to the destination).',
  },
  {
    text: 'Which data structure is most suitable for checking whether brackets are balanced?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Queue', 'Stack', 'Graph', 'Heap'],
    correct_answer: 'Stack',
    explanation:
      'Push opening brackets; when a closing bracket is encountered, pop and verify the top matches. If the stack is empty after scanning the expression, the brackets are balanced.',
  },
  {
    text: 'What is the average-case time complexity of binary search on a sorted array?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
    correct_answer: 'O(log N)',
    explanation:
      'Binary search halves the search space at every comparison step, giving a recurrence of T(N) = T(N/2) + O(1), which resolves to O(log N) average and worst-case time complexity.',
  },
  {
    text: 'Which OOP concept allows the same interface to represent different underlying implementations?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['Polymorphism', 'Encapsulation', 'Compilation', 'Recursion'],
    correct_answer: 'Polymorphism',
    explanation:
      'Polymorphism ("many forms") allows one interface or method name to behave differently depending on the object type (compile-time via overloading, or runtime via virtual/override functions).',
  },
  {
    text: 'What is the main difference between a stack and a queue?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'A stack follows FIFO, while a queue follows LIFO',
      'A stack follows LIFO, while a queue follows FIFO',
      'Both always follow LIFO',
      'Both always follow FIFO',
    ],
    correct_answer: 'A stack follows LIFO, while a queue follows FIFO',
    explanation:
      'Stack = Last-In, First-Out (think a stack of plates). Queue = First-In, First-Out (think a physical queue/line of people).',
  },
  {
    text: 'Which algorithmic technique solves a problem by dividing it into smaller subproblems, solving them, and combining their results?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Brute Force', 'Divide and Conquer', 'Linear Search', 'Randomization only'],
    correct_answer: 'Divide and Conquer',
    explanation:
      'Divide-and-Conquer splits the input into smaller parts, recursively solves each part, and merges the results. Classic examples: Merge Sort, Quick Sort, Binary Search.',
  },
  {
    text: 'What is the main purpose of a hash table?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'To enable efficient key-based lookup',
      'To guarantee that data remains sorted',
      'To implement recursion',
      'To store only integer values',
    ],
    correct_answer: 'To enable efficient key-based lookup',
    explanation:
      'A hash table maps keys to values using a hash function. Average-case get, set, and delete are O(1), making key-based lookup extremely fast.',
  },
  {
    text: 'Which sorting algorithm generally guarantees O(N log N) worst-case time complexity?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
    correct_answer: 'Merge Sort',
    explanation:
      'Merge Sort always divides the array in half and merges the halves, giving T(N) = 2T(N/2) + O(N), which is O(N log N) in all cases. Bubble, Selection, and Insertion Sort are all O(N²) in the worst case.',
  },
  {
    text: 'What is the purpose of a constructor in OOP?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'To initialize an object when it is created',
      'To destroy every object automatically',
      'To sort class methods',
      'To inherit another class',
    ],
    correct_answer: 'To initialize an object when it is created',
    explanation:
      "A constructor is a special method that runs automatically when an object is instantiated, setting initial values for the object's attributes.",
  },
  {
    text: 'Which traversal technique explores a graph level by level?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['DFS', 'BFS', 'Binary Search', 'Merge Sort'],
    correct_answer: 'BFS',
    explanation:
      'Breadth-First Search (BFS) uses a queue to explore all neighbors of a node before moving to the next level, guaranteeing that nodes are visited in non-decreasing order of their distance from the source.',
  },
  {
    text: 'What is the primary difference between an array and a linked list?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'Arrays use indexed storage, while linked lists connect nodes through links',
      'Linked lists cannot store integers',
      'Arrays cannot contain duplicate values',
      'Linked lists are always faster for every operation',
    ],
    correct_answer: 'Arrays use indexed storage, while linked lists connect nodes through links',
    explanation:
      'Array elements occupy contiguous memory addresses accessed by index (O(1) random access). Linked list nodes are scattered in memory, each holding a pointer to the next node (O(N) access, O(1) insertion/deletion at a known position).',
  },
  {
    text: "What is the purpose of a destructor in C++?",
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'To initialize an object',
      "To perform cleanup when an object's lifetime ends",
      'To create a new class',
      'To overload an operator',
    ],
    correct_answer: "To perform cleanup when an object's lifetime ends",
    explanation:
      'A destructor (prefixed with ~) is called automatically when an object goes out of scope or is explicitly deleted. It releases resources like heap memory, file handles, or network connections.',
  },
  {
    text: 'What is dynamic memory allocation?',
    difficulty: 'medium',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'Allocating memory during program execution',
      'Allocating memory only during compilation',
      'Automatically sorting memory',
      'Removing all variables from a program',
    ],
    correct_answer: 'Allocating memory during program execution',
    explanation:
      'Dynamic (runtime) memory allocation requests memory from the heap during execution (malloc/free in C, new/delete in C++, GC-managed in Java/Python), allowing variable-size or long-lived data structures.',
  },
  {
    text: 'Which technique avoids recalculating the same subproblems by storing previously computed results?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Memoization', 'Linear Search', 'Bubble Sort', 'Backtracking only'],
    correct_answer: 'Memoization',
    explanation:
      'Memoization is a top-down dynamic programming optimization: results of expensive function calls are cached in a lookup table (often a dictionary or array) so repeated calls with the same arguments return immediately.',
  },
  {
    text: 'Which data structure is commonly used to implement a priority queue efficiently?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'Heap',
      'Stack only',
      'Basic unsorted string',
      'Queue implemented with no priority information',
    ],
    correct_answer: 'Heap',
    explanation:
      'A binary heap maintains the heap property (min-heap: parent ≤ children; max-heap: parent ≥ children), supporting O(log N) insertion and O(log N) extraction of the minimum or maximum element.',
  },
  {
    text: 'What is the main purpose of a virtual function in C++?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'To support runtime polymorphism',
      'To prevent inheritance',
      'To make every function static',
      'To allocate arrays automatically',
    ],
    correct_answer: 'To support runtime polymorphism',
    explanation:
      'Declaring a function as virtual causes the call to be resolved at runtime based on the actual object type (dynamic dispatch through the vtable), enabling derived classes to override base-class behavior transparently through a base-class pointer.',
  },
  {
    text: 'Which of the following best describes a greedy algorithm?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: [
      'It makes a locally optimal choice at each step',
      'It always explores every possible solution',
      'It uses recursion in every case',
      'It always produces an incorrect result',
    ],
    correct_answer: 'It makes a locally optimal choice at each step',
    explanation:
      "A greedy algorithm builds a solution incrementally by always selecting the option that looks best at the current step without reconsidering prior choices. Examples: Huffman coding, Dijkstra's algorithm, Kruskal's MST.",
  },
  {
    text: 'What is the time complexity of inserting an element at the beginning of a singly linked list, assuming a pointer to the head is available?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
    correct_answer: 'O(1)',
    explanation:
      'Inserting at the head requires only creating a new node, pointing it to the current head, and updating the head pointer. This involves a constant number of operations regardless of list length.',
  },
  {
    text: 'What is the primary purpose of exception handling?',
    difficulty: 'medium',
    category: 'Fundamentals',
    code_snippet: null,
    options: [
      'To handle exceptional conditions during program execution',
      'To guarantee that bugs never occur',
      'To improve sorting complexity',
      'To replace all conditional statements',
    ],
    correct_answer: 'To handle exceptional conditions during program execution',
    explanation:
      'Exception handling (try/catch/finally in most languages) provides a structured mechanism for detecting and responding to runtime errors without crashing the program, separating error-handling logic from normal control flow.',
  },

  // ── TOUGH QUESTIONS (Q41–Q50) ────────────────────────────────────────────────
  {
    text: 'Which statement about function overloading in C++ is correct?',
    difficulty: 'tough',
    category: 'OOP',
    code_snippet: null,
    options: [
      'Functions can be overloaded solely by changing their return type',
      'Functions can be overloaded by changing their parameter lists',
      'Overloaded functions must belong to different classes',
      'Overloading is only possible with recursive functions',
    ],
    correct_answer: 'Functions can be overloaded by changing their parameter lists',
    explanation:
      'The C++ compiler resolves overloads at compile time using the parameter list (number, types, and order). Return type alone cannot be used to distinguish overloads because the compiler cannot infer which version to call without knowing the parameter types.',
  },
  {
    text: 'What is the time complexity of the standard recursive Tower of Hanoi algorithm?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: ['O(N)', 'O(N log N)', 'O(2ᴺ)', 'O(N!)'],
    correct_answer: 'O(2ᴺ)',
    explanation:
      'The recurrence T(N) = 2·T(N−1) + O(1) solves to T(N) = O(2ᴺ). The minimum number of moves 2ᴺ − 1 makes the time complexity exponential.',
  },
  {
    text: 'Which algorithm is generally suitable for finding shortest paths from a single source in a graph with non-negative edge weights?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: ["Dijkstra's Algorithm", 'Depth-First Search', 'Bubble Sort', 'Binary Search'],
    correct_answer: "Dijkstra's Algorithm",
    explanation:
      "Dijkstra's algorithm uses a min-priority queue to greedily relax edges, computing the minimum-cost path from a single source to all other vertices in O((V + E) log V) with a binary heap. It requires non-negative edge weights.",
  },
  {
    text: 'What is the main difference between backtracking and dynamic programming?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: [
      'Backtracking explores candidate solutions and abandons invalid paths; dynamic programming reuses solutions to overlapping subproblems',
      'Backtracking only works on arrays',
      'Dynamic programming never uses memory',
      'Both techniques are exactly the same',
    ],
    correct_answer:
      'Backtracking explores candidate solutions and abandons invalid paths; dynamic programming reuses solutions to overlapping subproblems',
    explanation:
      'Backtracking is a recursive search that prunes branches early when a partial solution cannot lead to a valid answer. Dynamic programming stores results of overlapping subproblems to avoid redundant computation (memoization / tabulation).',
  },
  {
    text: 'Which data structure is commonly used to implement an LRU cache with O(1) average-time get and put operations?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'Queue alone',
      'Hash map combined with a doubly linked list',
      'Binary search tree alone',
      'Stack alone',
    ],
    correct_answer: 'Hash map combined with a doubly linked list',
    explanation:
      'The hash map gives O(1) key lookup; the doubly linked list maintains access order (most-recent at head, least-recent at tail). On a get, the node is moved to the head. On a put that exceeds capacity, the tail node is evicted. Both operations are O(1).',
  },
  {
    text: 'What is the key property of a binary search tree, assuming distinct keys and the usual ordering convention?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'Every node must have exactly two children',
      "Keys in the left subtree are smaller, and keys in the right subtree are larger than the node's key",
      'All leaf nodes must be at the same depth',
      'Every node must store a sorted array',
    ],
    correct_answer:
      "Keys in the left subtree are smaller, and keys in the right subtree are larger than the node's key",
    explanation:
      "The BST ordering property: for every node n, all keys in its left subtree are strictly less than n's key, and all keys in its right subtree are strictly greater. This allows O(log N) average-case search, insertion, and deletion.",
  },
  {
    text: 'Which statement about a stable sorting algorithm is correct?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: [
      'It always uses O(1) extra space',
      'It preserves the relative order of equal-key elements',
      'It always runs in O(N) time',
      'It never compares elements',
    ],
    correct_answer: 'It preserves the relative order of equal-key elements',
    explanation:
      'A stable sort ensures that two elements with equal keys appear in the output in the same order as they appeared in the input. Merge Sort and Timsort are stable; Heap Sort and standard Quick Sort are not.',
  },
  {
    text: 'Which statement about a deadlock in an operating system is correct?',
    difficulty: 'tough',
    category: 'Operating Systems',
    code_snippet: null,
    options: [
      'It occurs only when a CPU overheats',
      'It can occur when processes wait indefinitely for resources held by one another',
      'It means a program has finished successfully',
      'It is another name for a syntax error',
    ],
    correct_answer: 'It can occur when processes wait indefinitely for resources held by one another',
    explanation:
      'A deadlock arises when a set of processes each hold a resource and each waits for a resource held by another, forming a cycle of dependencies. The four necessary conditions are mutual exclusion, hold-and-wait, no preemption, and circular wait.',
  },
  {
    text: 'Which statement about a trie is correct?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'It is commonly used for prefix-based string searching',
      'It is exclusively used for numerical sorting',
      'It always has exactly two children per node',
      'It cannot store words with shared prefixes',
    ],
    correct_answer: 'It is commonly used for prefix-based string searching',
    explanation:
      'A trie (prefix tree) stores strings by sharing common prefixes as shared paths from the root. This makes prefix queries (autocomplete, spell-check) efficient — O(L) per query where L is the string length.',
  },
  {
    text: 'What is the main idea behind the CAP theorem in distributed systems?',
    difficulty: 'tough',
    category: 'Distributed Systems',
    code_snippet: null,
    options: [
      'A distributed system can always guarantee consistency, availability, and partition tolerance simultaneously under a network partition',
      'During a network partition, a distributed system must make a trade-off between consistency and availability',
      'Every distributed system must use exactly three servers',
      'Partition tolerance eliminates the possibility of network failures',
    ],
    correct_answer:
      'During a network partition, a distributed system must make a trade-off between consistency and availability',
    explanation:
      'The CAP theorem (Brewer, 2000) states that during a network partition (P), a distributed system must choose between consistency (C — all nodes see the same data) and availability (A — every request receives a response). All three cannot be guaranteed simultaneously.',
  },

  // ── ORIENTATION 2026 TAILORED QUESTIONS (Batch '26 Algorithm) ───────────────────
  // Basic Python (Easy & Medium)
  {
    text: 'Which keyword is used to define a function in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['def', 'function', 'fun', 'define'],
    correct_answer: 'def',
    explanation:
      'In Python, functions are defined using the def keyword followed by the function name and parentheses.',
  },
  {
    text: 'What is the correct file extension for Python source files?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['.py', '.python', '.pt', '.pyt'],
    correct_answer: '.py',
    explanation: 'Python source code files traditionally use the .py file extension.',
  },
  {
    text: 'Which built-in function is used to output text to the console in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['print()', 'echo()', 'console.log()', 'System.out.println()'],
    correct_answer: 'print()',
    explanation:
      'The built-in print() function outputs the specified message to the screen or standard console in Python.',
  },
  {
    text: 'How do you create a single-line comment in Python code?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['# This is a comment', '// This is a comment', '/* This is a comment */', '<!-- This is a comment -->'],
    correct_answer: '# This is a comment',
    explanation: 'Python uses the hash character # to indicate that the remainder of the line is a comment.',
  },
  {
    text: 'Which method adds an element to the end of a list in Python?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: ['append()', 'add()', 'push()', 'insert()'],
    correct_answer: 'append()',
    explanation: 'The append() method adds a single item to the end of an existing Python list.',
  },
  {
    text: 'Which of the following data types in Python is immutable?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: ['Tuple', 'List', 'Dictionary', 'Set'],
    correct_answer: 'Tuple',
    explanation: 'A tuple is an immutable sequence in Python. Once created, elements of a tuple cannot be changed.',
  },

  // Basic SQL (Easy & Medium)
  {
    text: 'Which SQL statement is used to retrieve data from a database?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['SELECT', 'GET', 'EXTRACT', 'OPEN'],
    correct_answer: 'SELECT',
    explanation: 'The SELECT statement is used to query and extract data records from one or more tables in a database.',
  },
  {
    text: 'Which SQL clause is used to filter records based on a specified condition?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['WHERE', 'FILTER', 'HAVING', 'ORDER BY'],
    correct_answer: 'WHERE',
    explanation: 'The WHERE clause filters rows in SQL queries based on specified boolean conditions.',
  },
  {
    text: 'What does SQL stand for in database systems?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['Structured Query Language', 'Simple Question Language', 'Standard Query Logic', 'System Quality Language'],
    correct_answer: 'Structured Query Language',
    explanation: 'SQL stands for Structured Query Language, the standardized language used to manage relational databases.',
  },
  {
    text: 'Which SQL constraint uniquely identifies each record in a database table?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE NOT NULL', 'CHECK'],
    correct_answer: 'PRIMARY KEY',
    explanation: 'A PRIMARY KEY uniquely identifies each row in a database table and cannot contain NULL values.',
  },
  {
    text: 'Which SQL command is used to insert new rows into a database table?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['INSERT INTO', 'ADD RECORD', 'UPDATE', 'CREATE ROW'],
    correct_answer: 'INSERT INTO',
    explanation: 'The INSERT INTO statement is used to add new data rows into a database table.',
  },

  // Basic OOP (Medium)
  {
    text: 'What is an instantiated instance of a class called in Object-Oriented Programming?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['An Object', 'A Function', 'A Module', 'A Pointer'],
    correct_answer: 'An Object',
    explanation: 'An object is a specific, concrete instance of a class containing its own state and methods.',
  },
  {
    text: 'Which OOP principle bundles data and methods together while restricting direct external access?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['Encapsulation', 'Polymorphism', 'Overloading', 'Recursion'],
    correct_answer: 'Encapsulation',
    explanation:
      'Encapsulation bundles data and methods operating on that data inside a class and restricts direct access to internal state.',
  },
  {
    text: 'Which OOP concept allows the same interface or method name to behave differently for different object types?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['Polymorphism', 'Inheritance', 'Compilation', 'Iteration'],
    correct_answer: 'Polymorphism',
    explanation:
      'Polymorphism allows one interface or function signature to exhibit different behaviors depending on the runtime object type.',
  },

  // Basic Data Structures in Tough Section (Slot 5)
  {
    text: 'Which fundamental data structure operates strictly on a Last-In, First-Out (LIFO) basis?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Stack', 'Queue', 'Array', 'Binary Tree'],
    correct_answer: 'Stack',
    explanation: 'A Stack uses the LIFO principle: elements pushed last are the first to be popped from the top.',
  },
  {
    text: 'Which fundamental data structure operates strictly on a First-In, First-Out (FIFO) basis?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Queue', 'Stack', 'Heap', 'Graph'],
    correct_answer: 'Queue',
    explanation:
      'A Queue follows First-In, First-Out: the first element inserted at the rear is the first to be removed from the front.',
  },
  {
    text: 'What is the average time complexity to access an element by its index in a standard Array?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
    correct_answer: 'O(1)',
    explanation:
      'Because array elements are stored in contiguous memory addresses, random access by index takes constant time O(1).',
  },
  {
    text: 'In a singly linked list, what does each node store besides its data payload?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: [
      'A pointer/reference to the next node',
      'An integer index',
      'A duplicate copy of the list',
      'The total number of elements',
    ],
    correct_answer: 'A pointer/reference to the next node',
    explanation:
      'Each node in a singly linked list contains its data payload and a pointer/reference to the next node in the sequence.',
  },

  // ── EXPANDED VARIETY POOL (Q69–Q115) ────────────────────────────────────────
  // Python Easy & Medium
  {
    text: 'Which of the following functions converts an integer or float to a string in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['str()', 'int()', 'string()', 'parse()'],
    correct_answer: 'str()',
    explanation: 'The built-in str() function converts numbers and other objects to their string representation in Python.',
  },
  {
    text: 'What is the result of evaluating type([]) in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ["<class 'list'>", "<class 'array'>", "<class 'dict'>", "<class 'tuple'>"],
    correct_answer: "<class 'list'>",
    explanation: 'Square brackets [] define a list in Python, so type([]) returns <class \'list\'>.',
  },
  {
    text: 'Which keyword is used to define a function in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['def', 'function', 'fun', 'define'],
    correct_answer: 'def',
    explanation: 'The def keyword begins a function definition header in Python (e.g., def my_function():).',
  },
  {
    text: 'How do you append an element to the end of a list in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['append()', 'push()', 'add()', 'insert_last()'],
    correct_answer: 'append()',
    explanation: 'list.append(item) adds an element to the end of the list in O(1) amortized time.',
  },
  {
    text: 'What is the boolean evaluation of bool("") (empty string) in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['False', 'True', 'None', 'Error'],
    correct_answer: 'False',
    explanation: 'In Python, empty sequences such as empty strings "", empty lists [], and 0 evaluate to False.',
  },
  {
    text: 'Which built-in Python module is standard for generating pseudo-random numbers?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['random', 'math', 'rand', 'crypto'],
    correct_answer: 'random',
    explanation: 'Python\'s built-in random module provides functions like random.randint(), random.choice(), and random.shuffle().',
  },
  {
    text: 'What does the break statement do inside a loop in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: [
      'Terminates the loop immediately',
      'Skips to the next iteration',
      'Restarts the loop from beginning',
      'Raises a runtime exception',
    ],
    correct_answer: 'Terminates the loop immediately',
    explanation: 'The break statement immediately exits the innermost enclosing for or while loop.',
  },
  {
    text: 'What will len({"a": 1, "b": 2, "c": 3}) return in Python?',
    difficulty: 'easy',
    category: 'Python',
    code_snippet: null,
    options: ['3', '6', '1', 'Error'],
    correct_answer: '3',
    explanation: 'The len() function on a dictionary returns the total number of key-value pairs (keys).',
  },
  {
    text: 'What is the list slicing syntax arr[::-1] commonly used for in Python?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: ['Reversing the list', 'Sorting the list', 'Copying the first element', 'Deleting the list'],
    correct_answer: 'Reversing the list',
    explanation: 'arr[::-1] creates a reversed copy of the list by stepping backward with step -1.',
  },
  {
    text: 'What does the "is" operator check between two variables in Python?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: [
      'Memory identity (whether both refer to the exact same object)',
      'Value equality only',
      'Data type equality only',
      'Total memory footprint size',
    ],
    correct_answer: 'Memory identity (whether both refer to the exact same object)',
    explanation: '"is" checks object identity (id(a) == id(b)), whereas "==" checks value equality.',
  },
  {
    text: 'Which built-in data structure in Python stores unique, unordered elements?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: ['set', 'list', 'tuple', 'ordered_dict'],
    correct_answer: 'set',
    explanation: 'A set in Python contains only unique elements with O(1) average lookup via hashing.',
  },
  {
    text: 'What is the average-case time complexity of looking up a key in a standard Python dictionary?',
    difficulty: 'medium',
    category: 'Python',
    code_snippet: null,
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
    correct_answer: 'O(1)',
    explanation: 'Python dictionaries are implemented using hash tables, giving average O(1) key lookups.',
  },

  // SQL Easy & Medium
  {
    text: 'Which SQL clause is used to sort the result-set in ascending or descending order?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['ORDER BY', 'SORT BY', 'GROUP BY', 'ARRANGE BY'],
    correct_answer: 'ORDER BY',
    explanation: 'The ORDER BY clause sorts rows in ASC (default) or DESC order.',
  },
  {
    text: 'Which SQL keyword is used to eliminate duplicate rows from the query results?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['DISTINCT', 'UNIQUE', 'DIFFERENT', 'ISOLATE'],
    correct_answer: 'DISTINCT',
    explanation: 'SELECT DISTINCT column_name returns only distinct (different) values.',
  },
  {
    text: 'Which SQL aggregate function calculates the total sum of all numeric values in a column?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['SUM()', 'TOTAL()', 'COUNT()', 'ADD()'],
    correct_answer: 'SUM()',
    explanation: 'SUM(column) computes the arithmetic sum of the column values.',
  },
  {
    text: 'Which SQL statement removes all records from a table without deleting the table structure itself?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['TRUNCATE', 'REMOVE', 'DROP', 'ERASE'],
    correct_answer: 'TRUNCATE',
    explanation: 'TRUNCATE TABLE removes all rows quickly while keeping the table definition intact.',
  },
  {
    text: 'Which SQL operator is used to search for a pattern in text using % and _ wildcards?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['LIKE', 'PATTERN', 'MATCHES', 'SEARCH'],
    correct_answer: 'LIKE',
    explanation: 'The LIKE operator searches for patterns, where % matches zero or more chars and _ matches one char.',
  },
  {
    text: 'In SQL relational databases, what does a NULL value represent?',
    difficulty: 'easy',
    category: 'SQL',
    code_snippet: null,
    options: ['Missing or unknown data', 'A value of zero (0)', 'An empty text string', 'False boolean'],
    correct_answer: 'Missing or unknown data',
    explanation: 'NULL represents an unknown, absent, or missing value, not zero or empty string.',
  },
  {
    text: 'Which SQL clause is used to group rows that have the same values into summary rows?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['GROUP BY', 'AGGREGATE BY', 'COLLECT BY', 'CLUSTER'],
    correct_answer: 'GROUP BY',
    explanation: 'GROUP BY groups rows sharing common values so aggregate functions (COUNT, SUM, AVG) can run per group.',
  },
  {
    text: 'Which SQL clause is used to filter groups created by GROUP BY, acting like WHERE for aggregates?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['HAVING', 'WHERE GROUP', 'FILTER', 'LIMIT'],
    correct_answer: 'HAVING',
    explanation: 'HAVING filters aggregated groups (e.g., HAVING COUNT(*) > 5), whereas WHERE filters individual rows.',
  },
  {
    text: 'Which SQL JOIN returns all rows from the left table, and matching rows from the right table?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'],
    correct_answer: 'LEFT JOIN',
    explanation: 'LEFT JOIN returns all records from table1 (left), and the matched records from table2 (right).',
  },
  {
    text: 'What integrity constraint ensures that values in a child table reference valid rows in a parent table?',
    difficulty: 'medium',
    category: 'SQL',
    code_snippet: null,
    options: ['FOREIGN KEY', 'CHECK', 'INDEX', 'DEFAULT'],
    correct_answer: 'FOREIGN KEY',
    explanation: 'A FOREIGN KEY enforces referential integrity between tables by pointing to a PRIMARY KEY in another table.',
  },

  // OOP Easy & Medium
  {
    text: 'Which keyword in C++ and Java refers to the current instance of the class?',
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: ['this', 'self', 'current', 'instance'],
    correct_answer: 'this',
    explanation: '"this" is an implicit pointer/reference to the current object instance within member functions.',
  },
  {
    text: 'What is an abstract class in Object-Oriented Programming?',
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: [
      'A class that cannot be instantiated directly and is meant to be subclassed',
      'A class with only static methods',
      'A class with zero member variables',
      'A compiled machine code library',
    ],
    correct_answer: 'A class that cannot be instantiated directly and is meant to be subclassed',
    explanation: 'Abstract classes provide a base template and common interface that derived subclasses must implement.',
  },
  {
    text: 'Which access specifier restricts class members so they can only be accessed within the class itself?',
    difficulty: 'easy',
    category: 'OOP',
    code_snippet: null,
    options: ['private', 'public', 'protected', 'package'],
    correct_answer: 'private',
    explanation: 'private members are encapsulated and cannot be accessed from outside the class or by derived classes.',
  },
  {
    text: 'What is method overriding in Object-Oriented Programming?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'A derived class redefining a method of its base class with the same signature',
      'Defining functions with the same name but different parameters',
      'Calling a destructor multiple times',
      'Creating a new instance with the new operator',
    ],
    correct_answer: 'A derived class redefining a method of its base class with the same signature',
    explanation: 'Method overriding enables runtime polymorphism by letting a derived class provide a specific implementation.',
  },
  {
    text: 'Which OOP concept is also known as runtime dynamic binding or dynamic dispatch?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['Dynamic Polymorphism', 'Encapsulation', 'Abstraction', 'Data Hiding'],
    correct_answer: 'Dynamic Polymorphism',
    explanation: 'Dynamic polymorphism uses virtual method tables (vtables) to resolve function calls at runtime.',
  },
  {
    text: 'In C++, what makes a function a "pure virtual function"?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: [
      'Declaring it with "= 0" in the base class with no implementation',
      'Adding the static keyword',
      'Declaring it inside a private section',
      'Returning a void pointer',
    ],
    correct_answer: 'Declaring it with "= 0" in the base class with no implementation',
    explanation: 'virtual void func() = 0; defines a pure virtual function, making the enclosing class abstract.',
  },
  {
    text: 'What fundamental object-oriented relationship is represented by inheritance?',
    difficulty: 'medium',
    category: 'OOP',
    code_snippet: null,
    options: ['IS-A relationship', 'HAS-A relationship', 'USES-A relationship', 'CONTAINS relationship'],
    correct_answer: 'IS-A relationship',
    explanation: 'Inheritance represents an IS-A relationship (e.g., a Dog IS-A Animal); composition represents HAS-A.',
  },

  // Data Structures Easy, Medium & Tough
  {
    text: 'What is the worst-case search time complexity in an unsorted Array of size N?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'],
    correct_answer: 'O(N)',
    explanation: 'In an unsorted array, linear search must check every element in the worst case, taking O(N) time.',
  },
  {
    text: 'Which data structure is optimal for implementing Breadth-First Search (BFS) on a graph?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Queue', 'Stack', 'Heap', 'Tree'],
    correct_answer: 'Queue',
    explanation: 'BFS explores vertices level-by-level, requiring a FIFO Queue to visit neighbors in order of arrival.',
  },
  {
    text: 'Which data structure is fundamentally used to maintain active function call frames in computers?',
    difficulty: 'easy',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Call Stack', 'Queue', 'Hash Table', 'B-Tree'],
    correct_answer: 'Call Stack',
    explanation: 'The call stack uses LIFO order: the most recently invoked function returns first before its caller resumes.',
  },
  {
    text: 'In a Circular Queue with capacity N, how is the next index calculated to wrap around?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['(index + 1) % N', 'index + N', 'index / N', 'index * N'],
    correct_answer: '(index + 1) % N',
    explanation: 'The modulo operator % wraps the index back to 0 when it reaches the capacity N.',
  },
  {
    text: 'What is the maximum number of children any node can have in a Binary Tree?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['2', '1', '3', 'Unlimited'],
    correct_answer: '2',
    explanation: 'By definition, each node in a binary tree has at most two children: left child and right child.',
  },
  {
    text: 'What is the height of a balanced Binary Search Tree containing N elements?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
    correct_answer: 'O(log N)',
    explanation: 'A balanced BST maintains logarithmic height O(log N), allowing O(log N) searches, inserts, and deletes.',
  },
  {
    text: 'Which data structure supports efficient O(1) insertions and deletions at both the front and back?',
    difficulty: 'medium',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Deque (Double-Ended Queue)', 'Single Stack only', 'Array without reallocation', 'Singly Linked List without tail'],
    correct_answer: 'Deque (Double-Ended Queue)',
    explanation: 'A Deque (double-ended queue) provides constant time O(1) push and pop operations from both ends.',
  },
  {
    text: 'Which self-balancing binary search tree ensures balance by requiring that heights of left and right subtrees differ by at most 1?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['AVL Tree', 'B-Tree', 'Min-Heap', 'Segment Tree'],
    correct_answer: 'AVL Tree',
    explanation: 'An AVL tree is a self-balancing BST where the balance factor (height(left) - height(right)) is always -1, 0, or +1.',
  },
  {
    text: 'What is the space complexity of an Adjacency List representing a graph with V vertices and E edges?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(V + E)', 'O(V²)', 'O(E²)', 'O(V × E)'],
    correct_answer: 'O(V + E)',
    explanation: 'An adjacency list stores V array/list headers and a total of 2E node links for undirected graphs (E for directed).',
  },
  {
    text: 'What is the time complexity to retrieve (peek) the minimum element in a standard Min-Heap?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct_answer: 'O(1)',
    explanation: 'The minimum element in a min-heap is always stored at the root (index 0), retrievable in O(1) time.',
  },
  {
    text: 'Which tree data structure is optimal for autocomplete and prefix-based string searching?',
    difficulty: 'tough',
    category: 'Data Structures',
    code_snippet: null,
    options: ['Trie (Prefix Tree)', 'Binary Heap', 'Queue', 'Red-Black Tree'],
    correct_answer: 'Trie (Prefix Tree)',
    explanation: 'A Trie stores strings by common prefix paths, allowing O(L) prefix queries where L is key length.',
  },

  // Algorithms Easy, Medium & Tough
  {
    text: 'What is the best-case time complexity of Bubble Sort when an early-exit swap flag is used on an already sorted array?',
    difficulty: 'easy',
    category: 'Algorithms',
    code_snippet: null,
    options: ['O(N)', 'O(N²)', 'O(log N)', 'O(1)'],
    correct_answer: 'O(N)',
    explanation: 'With a swapped boolean flag, Bubble Sort detects no swaps were made on the first pass and terminates in O(N).',
  },
  {
    text: 'Which algorithmic paradigm does Binary Search belong to?',
    difficulty: 'easy',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Decrease and Conquer', 'Dynamic Programming', 'Brute Force', 'Backtracking'],
    correct_answer: 'Decrease and Conquer',
    explanation: 'Binary Search halves the search space at each comparison step, following the Decrease and Conquer paradigm.',
  },
  {
    text: 'What is the average-case time complexity of the QuickSort algorithm?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['O(N log N)', 'O(N²)', 'O(N)', 'O(2ᴺ)'],
    correct_answer: 'O(N log N)',
    explanation: 'QuickSort recursively partitions the array around a pivot, achieving O(N log N) average-case time complexity.',
  },
  {
    text: 'Which sorting algorithm repeatedly finds the minimum element from the unsorted part and puts it at the beginning?',
    difficulty: 'medium',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Selection Sort', 'Merge Sort', 'Quick Sort', 'Radix Sort'],
    correct_answer: 'Selection Sort',
    explanation: 'Selection Sort divides the list into sorted and unsorted regions, finding the minimum of the unsorted part at each step.',
  },
  {
    text: 'Which dynamic programming algorithm computes all-pairs shortest paths in a weighted graph in O(V³) time?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Floyd-Warshall Algorithm', 'Dijkstra Algorithm', 'Kruskal Algorithm', 'Prim Algorithm'],
    correct_answer: 'Floyd-Warshall Algorithm',
    explanation: 'Floyd-Warshall uses three nested loops over vertices to find shortest paths between all pairs of vertices in O(V³).',
  },
  {
    text: 'What is the time complexity of Kruskal\'s Minimum Spanning Tree algorithm using Disjoint Set Union (DSU)?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: ['O(E log E)', 'O(V³)', 'O(2ⱽ)', 'O(V!)'],
    correct_answer: 'O(E log E)',
    explanation: 'Sorting the E edges takes O(E log E) time; DSU find and union operations take near-constant O(E α(V)) time.',
  },
  {
    text: 'Which algorithmic design paradigm solves the 0/1 Knapsack problem in pseudo-polynomial O(N × W) time?',
    difficulty: 'tough',
    category: 'Algorithms',
    code_snippet: null,
    options: ['Dynamic Programming', 'Linear Search', 'Pure Greedy without DP', 'Binary Search on values'],
    correct_answer: 'Dynamic Programming',
    explanation: 'Dynamic programming builds a table of subproblem solutions dp[i][w] to find optimal subsets without redundant computation.',
  },
];

export async function seedDatabase(db?: IDatabase): Promise<void> {
  const targetDb = db || getDB();
  await initDatabase(targetDb);

  console.log('[Seed] Seeding questions into database...');

  const procedural = generateProceduralQuestions(500);
  const allToSeed = [...seedQuestions, ...footballLegendsQuestions, ...procedural];

  for (const q of allToSeed) {
    const existing = await targetDb.getOne('SELECT id FROM questions WHERE text = ?', [q.text]);
    if (!existing) {
      const id = 'q_' + crypto.randomUUID().slice(0, 12);
      await targetDb.run(
        `INSERT INTO questions (id, text, difficulty, category, options, correct_answer, explanation, code_snippet, is_active, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        [
          id,
          q.text,
          q.difficulty,
          q.category,
          JSON.stringify(q.options),
          q.correct_answer,
          q.explanation,
          q.code_snippet,
          new Date().toISOString(),
        ]
      );
    }
  }

  const counts = await targetDb.query<{ difficulty: string; count: number }>(
    'SELECT difficulty, COUNT(*) as count FROM questions WHERE is_active = 1 GROUP BY difficulty'
  );
  console.log('[Seed] Active question counts by difficulty:', counts);
}

// Allow direct execution
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => {
      console.log('[Seed] Complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed] Error:', err);
      process.exit(1);
    });
}
