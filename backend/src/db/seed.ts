import crypto from 'crypto';
import { getDB, IDatabase } from './connection.js';
import { initDatabase } from './init.js';

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
];

export async function seedDatabase(db?: IDatabase): Promise<void> {
  const targetDb = db || getDB();
  await initDatabase(targetDb);

  console.log('[Seed] Seeding questions into database...');

  for (const q of seedQuestions) {
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
