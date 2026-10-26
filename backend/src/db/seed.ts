import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getDB, IDatabase } from './connection.js';
import { initDatabase } from './init.js';

export const seedQuestions = [
  // EASY QUESTIONS (Points: 10)
  {
    text: "What will be the output of the following C++ code snippet?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: `#include <iostream>
using namespace std;

int main() {
    int a = 5;
    int b = ++a + 2;
    cout << a << " " << b;
    return 0;
}`,
    options: [
      "6 8",
      "5 7",
      "6 7",
      "5 8"
    ],
    correct_answer: "6 8",
    explanation: "The pre-increment ++a increases 'a' from 5 to 6 first, so 'a' becomes 6. Then b = 6 + 2 = 8. Output is '6 8'."
  },
  {
    text: "In Python, which of the following data structures is immutable?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: null,
    options: [
      "Tuple",
      "List",
      "Dictionary",
      "Set"
    ],
    correct_answer: "Tuple",
    explanation: "Tuples are immutable in Python; once created, their elements cannot be changed, added, or removed."
  },
  {
    text: "What is the time complexity of accessing an element at a given index in a standard static array?",
    difficulty: "easy",
    category: "Data Structures",
    code_snippet: null,
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correct_answer: "O(1)",
    explanation: "Array elements are stored in contiguous memory locations, allowing direct calculation of the element's memory address in O(1) constant time."
  },
  {
    text: "Which keyword in C++ is used to prevent modifications to a variable?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: null,
    options: [
      "const",
      "static",
      "volatile",
      "final"
    ],
    correct_answer: "const",
    explanation: "The 'const' keyword qualifies a variable as read-only, preventing its value from being changed after initialization."
  },
  {
    text: "What does the following Python statement evaluate to?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: `print(bool([]) == False, bool([0]) == True)`,
    options: [
      "True True",
      "False True",
      "True False",
      "False False"
    ],
    correct_answer: "True True",
    explanation: "An empty list [] is falsy in Python so bool([]) is False. A non-empty list like [0] has length 1 which is truthy, so bool([0]) is True."
  },
  {
    text: "Which of the following data structures follows the Last-In-First-Out (LIFO) principle?",
    difficulty: "easy",
    category: "Data Structures",
    code_snippet: null,
    options: [
      "Stack",
      "Queue",
      "Linked List",
      "Binary Heap"
    ],
    correct_answer: "Stack",
    explanation: "A Stack operates on a Last-In, First-Out (LIFO) basis, meaning the most recently added item is removed first."
  },
  {
    text: "What will be printed by this C loop?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: `int count = 0;
for (int i = 0; i < 5; i += 2) {
    count++;
}
printf("%d", count);`,
    options: [
      "3",
      "2",
      "5",
      "4"
    ],
    correct_answer: "3",
    explanation: "The loop variable i takes values 0, 2, and 4 before i becomes 6 and terminates. Thus, the loop runs 3 times."
  },
  {
    text: "What is the result of the bitwise expression `7 & 3`?",
    difficulty: "easy",
    category: "Logical Reasoning",
    code_snippet: null,
    options: [
      "3",
      "7",
      "4",
      "0"
    ],
    correct_answer: "3",
    explanation: "7 in binary is 0111 and 3 is 0011. Performing bitwise AND yields 0011, which is 3 in decimal."
  },
  {
    text: "In JavaScript, what is the output of `typeof NaN`?",
    difficulty: "easy",
    category: "Fundamentals",
    code_snippet: `console.log(typeof NaN);`,
    options: [
      "number",
      "nan",
      "undefined",
      "object"
    ],
    correct_answer: "number",
    explanation: "Despite representing 'Not-a-Number', NaN is specified in IEEE 754 floating-point arithmetic and its JavaScript type is 'number'."
  },
  {
    text: "Which data structure is most suitable for implementing a Breadth-First Search (BFS) graph traversal?",
    difficulty: "easy",
    category: "Data Structures",
    code_snippet: null,
    options: [
      "Queue",
      "Stack",
      "Priority Queue",
      "Hash Map"
    ],
    correct_answer: "Queue",
    explanation: "Breadth-First Search processes vertices level by level using a FIFO Queue to track visited neighbors."
  },

  // MEDIUM QUESTIONS (Points: 20)
  {
    text: "What will the following recursive function return for `mystery(4)`?",
    difficulty: "medium",
    category: "Algorithms",
    code_snippet: `int mystery(int n) {
    if (n <= 1) return 1;
    return n * mystery(n - 2);
}`,
    options: [
      "8",
      "24",
      "4",
      "16"
    ],
    correct_answer: "8",
    explanation: "mystery(4) = 4 * mystery(2) = 4 * (2 * mystery(0)) = 4 * (2 * 1) = 8."
  },
  {
    text: "What is the worst-case time complexity of QuickSort when the pivot is always chosen as the first element on an already sorted array?",
    difficulty: "medium",
    category: "Algorithms",
    code_snippet: null,
    options: [
      "O(n²)",
      "O(n log n)",
      "O(n)",
      "O(log n)"
    ],
    correct_answer: "O(n²)",
    explanation: "When an array is already sorted and the pivot is the first element, partitions become completely unbalanced (sizes 0 and n-1), resulting in O(n²) worst-case time complexity."
  },
  {
    text: "What will be printed by this C++ code snippet?",
    difficulty: "medium",
    category: "Debugging",
    code_snippet: `#include <iostream>
using namespace std;

void func(int *p) {
    int q = 10;
    p = &q;
}

int main() {
    int r = 20;
    int *p = &r;
    func(p);
    cout << *p;
    return 0;
}`,
    options: [
      "20",
      "10",
      "Segmentation Fault",
      "Garbage Value"
    ],
    correct_answer: "20",
    explanation: "In C++, pointer 'p' is passed by value to func(). Modifying the local copy of the pointer inside func() does not alter 'p' in main(). Hence, *p remains 20."
  },
  {
    text: "Given an array of size N, what is the minimum number of comparisons needed to find both the minimum and maximum elements simultaneously?",
    difficulty: "medium",
    category: "Algorithms",
    code_snippet: null,
    options: [
      "3n/2 - 2",
      "2n - 2",
      "n - 1",
      "n log n"
    ],
    correct_answer: "3n/2 - 2",
    explanation: "By comparing elements in pairs first, and then comparing the smaller with the min and larger with the max, we achieve 3n/2 - 2 comparisons instead of 2n - 2."
  },
  {
    text: "What is the output of the following Python list comprehension?",
    difficulty: "medium",
    category: "Fundamentals",
    code_snippet: `matrix = [[1, 2], [3, 4]]
flat = [num for row in matrix for num in row if num % 2 != 0]
print(flat)`,
    options: [
      "[1, 3]",
      "[1, 2, 3, 4]",
      "[3, 1]",
      "[2, 4]"
    ],
    correct_answer: "[1, 3]",
    explanation: "The nested comprehension iterates over each row [1, 2] and [3, 4], selecting only odd numbers, which are 1 and 3."
  },
  {
    text: "Which of the following binary tree traversals uniquely identifies a binary tree when paired with the Inorder traversal?",
    difficulty: "medium",
    category: "Data Structures",
    code_snippet: null,
    options: [
      "Preorder or Postorder",
      "Level Order only",
      "Preorder only",
      "Neither Preorder nor Postorder"
    ],
    correct_answer: "Preorder or Postorder",
    explanation: "Pairing Inorder traversal with either Preorder or Postorder traversal provides enough root-partition information to uniquely reconstruct any binary tree."
  },
  {
    text: "What will be the output of this JavaScript snippet?",
    difficulty: "medium",
    category: "Debugging",
    code_snippet: `const a = [1, 2, 3];
const b = a;
b.push(4);
const c = [...a];
c.push(5);
console.log(a.length, c.length);`,
    options: [
      "4 5",
      "3 5",
      "4 4",
      "5 5"
    ],
    correct_answer: "4 5",
    explanation: "b is assigned a reference to array a, so b.push(4) modifies a, giving a.length = 4. c is created as a shallow copy using spread, so c.push(5) changes c to length 5 without modifying a."
  },
  {
    text: "What does the following bitwise trick do: `x & (x - 1)` for a positive integer x?",
    difficulty: "medium",
    category: "Logical Reasoning",
    code_snippet: null,
    options: [
      "Clears the lowest set bit",
      "Checks if x is odd",
      "Doubles the value of x",
      "Inverts all bits of x"
    ],
    correct_answer: "Clears the lowest set bit",
    explanation: "Subtracting 1 flips the least significant set bit and all trailing zeros to 1. Bitwise ANDing with the original x clears that lowest set bit (Brian Kernighan's algorithm)."
  },
  {
    text: "What is the space complexity of standard recursive Depth First Search on a balanced binary tree with N nodes?",
    difficulty: "medium",
    category: "Complexity",
    code_snippet: null,
    options: [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N log N)"
    ],
    correct_answer: "O(log N)",
    explanation: "The maximum depth of the call stack in a balanced binary tree is equal to the height of the tree, which is O(log N)."
  },
  {
    text: "What will be printed by this C code with static variables?",
    difficulty: "medium",
    category: "Fundamentals",
    code_snippet: `#include <stdio.h>

int counter() {
    static int x = 1;
    x *= 2;
    return x;
}

int main() {
    printf("%d ", counter());
    printf("%d", counter());
    return 0;
}`,
    options: [
      "2 4",
      "2 2",
      "1 2",
      "4 4"
    ],
    correct_answer: "2 4",
    explanation: "A static local variable retains its value across function calls. In call 1, x = 1*2 = 2. In call 2, x = 2*2 = 4."
  },

  // HARD QUESTIONS (Points: 30)
  {
    text: "What is the output of the following C++ program involving virtual functions and destructors?",
    difficulty: "hard",
    category: "Object-Oriented Programming",
    code_snippet: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void show() { cout << "Base"; }
    virtual ~Base() { cout << "~B"; }
};

class Derived : public Base {
public:
    void show() override { cout << "Derived"; }
    ~Derived() { cout << "~D"; }
};

int main() {
    Base *ptr = new Derived();
    ptr->show();
    delete ptr;
    return 0;
}`,
    options: [
      "Derived~D~B",
      "Derived~B",
      "Base~B",
      "Base~D~B"
    ],
    correct_answer: "Derived~D~B",
    explanation: "ptr->show() dynamically dispatches to Derived::show(). When delete ptr is invoked with a virtual destructor in Base, Derived's destructor executes first (~D) followed by Base's destructor (~B)."
  },
  {
    text: "What is the time complexity of the following nested loop function?",
    difficulty: "hard",
    category: "Complexity",
    code_snippet: `void compute(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i *= 2) {
        for (int j = 1; j <= i; j++) {
            sum++;
        }
    }
}`,
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(log n)"
    ],
    correct_answer: "O(n)",
    explanation: "The outer loop runs for i = 1, 2, 4, 8, ..., 2^k <= n. The inner loop runs i times. Total iterations = 1 + 2 + 4 + ... + 2^k = 2^(k+1) - 1 < 2n, which is O(n)."
  },
  {
    text: "What will be printed by the following JavaScript event loop snippet?",
    difficulty: "hard",
    category: "Debugging",
    code_snippet: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
Promise.resolve().then(() => {
    console.log("4");
    process.nextTick(() => console.log("5"));
});
console.log("6");`,
    options: [
      "1 6 3 4 5 2",
      "1 2 3 4 5 6",
      "1 6 2 3 4 5",
      "1 6 5 3 4 2"
    ],
    correct_answer: "1 6 3 4 5 2",
    explanation: "Synchronous code runs first: '1' then '6'. Microtasks run next: '3', then '4'. '5' is scheduled in nextTick queue before macrotask queue. Finally, timer macrotask executes '2'."
  },
  {
    text: "In C, what does the following declaration mean: `int (*(*foo)(void))[5];`?",
    difficulty: "hard",
    category: "Fundamentals",
    code_snippet: null,
    options: [
      "foo is a pointer to a function returning a pointer to an array of 5 ints",
      "foo is an array of 5 pointers to functions returning int",
      "foo is a function returning an array of 5 pointers to int",
      "foo is a pointer to an array of 5 function pointers"
    ],
    correct_answer: "foo is a pointer to a function returning a pointer to an array of 5 ints",
    explanation: "Reading inside-out: (*foo) is a pointer to a function taking (void); (*(...)) dereferences its return value as a pointer; [5] indicates an array of 5; int indicates array elements are ints."
  },
  {
    text: "Given an unsorted array of N elements, what is the worst-case time complexity of the Median-of-Medians selection algorithm to find the K-th smallest element?",
    difficulty: "hard",
    category: "Algorithms",
    code_snippet: null,
    options: [
      "O(N)",
      "O(N log N)",
      "O(N²)",
      "O(log N)"
    ],
    correct_answer: "O(N)",
    explanation: "The Median-of-Medians algorithm guarantees a good pivot split (at least 30%/70%), yielding a linear recurrence T(N) <= T(N/5) + T(7N/10) + O(N) = O(N) even in the worst case."
  },
  {
    text: "What will be printed by this Python generator pipeline?",
    difficulty: "hard",
    category: "Fundamentals",
    code_snippet: `def gen():
    for x in range(3):
        yield x

g = gen()
a = list(g)
b = list(g)
print(len(a), len(b))`,
    options: [
      "3 0",
      "3 3",
      "0 0",
      "TypeError"
    ],
    correct_answer: "3 0",
    explanation: "A generator object in Python is an iterator that can only be exhausted once. list(g) consumes all values 0, 1, 2. The second list(g) finds it exhausted, producing an empty list []."
  },
  {
    text: "What is the maximum number of edges in a directed acyclic graph (DAG) with V vertices?",
    difficulty: "hard",
    category: "Data Structures",
    code_snippet: null,
    options: [
      "V * (V - 1) / 2",
      "V * (V - 1)",
      "V²",
      "2^V"
    ],
    correct_answer: "V * (V - 1) / 2",
    explanation: "In any DAG, a topological sort orders the vertices from 1 to V. Edges can only go from smaller to larger indices to prevent cycles. Vertex 1 has <= V-1 outgoing edges, vertex 2 has <= V-2, etc. Total = V(V-1)/2."
  },
  {
    text: "What is the output of the following C program with pointer arithmetic?",
    difficulty: "hard",
    category: "Debugging",
    code_snippet: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p1 = arr;
    int *p2 = arr + 4;
    printf("%ld", p2 - p1);
    return 0;
}`,
    options: [
      "4",
      "16",
      "8",
      "5"
    ],
    correct_answer: "4",
    explanation: "Subtracting two pointers pointing within the same array computes the difference in indices (number of elements between them), not bytes. 4 - 0 = 4."
  }
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

  // Create default Admin account if not exists
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@geekroom.in';
  const existingAdmin = await targetDb.getOne('SELECT id FROM admins WHERE email = ?', [adminEmail]);

  if (!existingAdmin) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'GeekroomAdmin2025!';
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const adminId = 'admin_' + crypto.randomUUID().slice(0, 12);

    await targetDb.run(
      `INSERT INTO admins (id, username, email, password_hash, role, created_at)
       VALUES (?, ?, ?, ?, 'admin', ?)`,
      [adminId, 'admin', adminEmail, passwordHash, new Date().toISOString()]
    );
    console.log(`[Seed] Created default admin account: ${adminEmail} (Password: ${adminPassword})`);
  } else {
    console.log(`[Seed] Admin account ${adminEmail} already present.`);
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
