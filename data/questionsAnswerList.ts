export const qaList = [
    // Full-Stack, Web & Mobile
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces.", badge: 'React', level: 'Beginner', done: false },
    { question: "What is Angular?", answer: "Angular is a platform for building mobile and desktop web applications.", badge: 'Angular', level: 'Intermediate', done: false },
    { question: "What is Vue?", answer: "Vue is a progressive framework for building user interfaces.", badge: 'Vue', level: 'Beginner', done: false },
    { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.", badge: 'Node.js', level: 'Intermediate', done: false },
    { question: "What is Express?", answer: "Express is a minimal and flexible Node.js web application framework.", badge: 'Express', level: 'Intermediate', done: false },
    { question: "What is Django?", answer: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.", badge: 'Django', level: 'Advanced', done: false },
    { question: "What is Flask?", answer: "Flask is a micro web framework written in Python.", badge: 'Flask', level: 'Beginner', done: false },
    { question: "What is Spring Boot?", answer: "Spring Boot is an open source Java-based framework used to create a micro Service.", badge: 'Spring Boot', level: 'Intermediate', done: false },
    { question: "What is Ruby on Rails?", answer: "Ruby on Rails is a server-side web application framework written in Ruby.", badge: 'Ruby on Rails', level: 'Advanced', done: false },
    { question: "What is ASP.NET?", answer: "ASP.NET is an open-source, server-side web-application framework designed for web development to produce dynamic web pages.", badge: 'ASP.NET', level: 'Intermediate', done: false },
    { question: "What is React Native?", answer: "React Native is an open-source mobile application framework created by Facebook.", badge: 'React Native', level: 'Beginner', done: false },
    { question: "What is Flutter?", answer: "Flutter is an open-source UI software development kit created by Google.", badge: 'Flutter', level: 'Intermediate', done: false },
    { question: "What is Ionic?", answer: "Ionic is a complete open-source SDK for hybrid mobile app development.", badge: 'Ionic', level: 'Beginner', done: false },

    // Algorithms & Data Structures
    { question: "What is Binary Search?", answer: "Binary Search is a search algorithm that finds the position of a target value within a sorted array.", badge: 'Binary Search', level: 'Beginner', done: false },
    { question: "What is Quick Sort?", answer: "Quick Sort is an efficient sorting algorithm that uses a divide-and-conquer approach.", badge: 'Quick Sort', level: 'Intermediate', done: false },
    { question: "What is Merge Sort?", answer: "Merge Sort is a stable, comparison-based, divide-and-conquer sorting algorithm.", badge: 'Merge Sort', level: 'Intermediate', done: false },
    { question: "What is Dynamic Programming?", answer: "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.", badge: 'Dynamic Programming', level: 'Advanced', done: false },
    { question: "What are Graph Algorithms?", answer: "Graph Algorithms are a set of instructions that traverse (visits nodes of) a graph.", badge: 'Graph Algorithms', level: 'Advanced', done: false },
    { question: "What is Tree Traversal?", answer: "Tree Traversal is a process of visiting all the nodes in a tree data structure.", badge: 'Tree Traversal', level: 'Beginner', done: false },
    { question: "What is Hashing?", answer: "Hashing is the process of converting an input of any length into a fixed size string of text.", badge: 'Hashing', level: 'Intermediate', done: false },
    { question: "What is Recursion?", answer: "Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.", badge: 'Recursion', level: 'Beginner', done: false },

    // System Design & Architecture
    { question: "What are Microservices?", answer: "Microservices are an architectural style that structures an application as a collection of loosely coupled services.", badge: 'Microservices', level: 'Advanced', done: false },
    { question: "What is Monolithic Architecture?", answer: "Monolithic Architecture is a traditional model of software design where all the components of the application are combined into a single program.", badge: 'Monolithic Architecture', level: 'Beginner', done: false },
    { question: "What is Load Balancing?", answer: "Load Balancing is the process of distributing network traffic across multiple servers.", badge: 'Load Balancing', level: 'Intermediate', done: false },
    { question: "What is Caching?", answer: "Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.", badge: 'Caching', level: 'Beginner', done: false },
    { question: "What is Database Sharding?", answer: "Database Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.", badge: 'Database Sharding', level: 'Advanced', done: false },
    { question: "What is CAP Theorem?", answer: "CAP Theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.", badge: 'CAP Theorem', level: 'Intermediate', done: false },
    { question: "What are Message Queues?", answer: "Message Queues are a form of asynchronous service-to-service communication used in serverless and microservices architectures.", badge: 'Message Queues', level: 'Intermediate', done: false },
    { question: "What is an API Gateway?", answer: "An API Gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.", badge: 'API Gateway', level: 'Advanced', done: false },

    // Data Science & ML
    { question: "What is Linear Regression?", answer: "Linear Regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables.", badge: 'Linear Regression', level: 'Beginner', done: false },
    { question: "What is Logistic Regression?", answer: "Logistic Regression is a statistical method for analyzing a dataset in which there are one or more independent variables that determine an outcome.", badge: 'Logistic Regression', level: 'Intermediate', done: false },
    { question: "What are Decision Trees?", answer: "Decision Trees are a non-parametric supervised learning method used for classification and regression.", badge: 'Decision Trees', level: 'Beginner', done: false },
    { question: "What are Random Forests?", answer: "Random Forests are an ensemble learning method for classification, regression, and other tasks that operate by constructing a multitude of decision trees.", badge: 'Random Forests', level: 'Intermediate', done: false },
    { question: "What are Support Vector Machines?", answer: "Support Vector Machines are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis.", badge: 'Support Vector Machines', level: 'Advanced', done: false },
    { question: "What are Neural Networks?", answer: "Neural Networks are a series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.", badge: 'Neural Networks', level: 'Advanced', done: false },
    { question: "What is K-Means Clustering?", answer: "K-Means Clustering is a method of vector quantization, originally from signal processing, that is popular for cluster analysis in data mining.", badge: 'K-Means Clustering', level: 'Intermediate', done: false },
    { question: "What is Principal Component Analysis?", answer: "Principal Component Analysis is a technique for reducing the dimensionality of such datasets, increasing interpretability but at the same time minimizing information loss.", badge: 'Principal Component Analysis', level: 'Advanced', done: false },

    // Full-Stack, Web & Mobile
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces.", badge: 'React', level: 'Beginner', done: false },
    { question: "What is Angular?", answer: "Angular is a platform for building mobile and desktop web applications.", badge: 'Angular', level: 'Intermediate', done: false },
    { question: "What is Vue?", answer: "Vue is a progressive framework for building user interfaces.", badge: 'Vue', level: 'Beginner', done: false },
    { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.", badge: 'Node.js', level: 'Intermediate', done: false },
    { question: "What is Express?", answer: "Express is a minimal and flexible Node.js web application framework.", badge: 'Express', level: 'Intermediate', done: false },
    { question: "What is Django?", answer: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.", badge: 'Django', level: 'Advanced', done: false },
    { question: "What is Flask?", answer: "Flask is a micro web framework written in Python.", badge: 'Flask', level: 'Beginner', done: false },
    { question: "What is Spring Boot?", answer: "Spring Boot is an open source Java-based framework used to create a micro Service.", badge: 'Spring Boot', level: 'Intermediate', done: false },
    { question: "What is Ruby on Rails?", answer: "Ruby on Rails is a server-side web application framework written in Ruby.", badge: 'Ruby on Rails', level: 'Advanced', done: false },
    { question: "What is ASP.NET?", answer: "ASP.NET is an open-source, server-side web-application framework designed for web development to produce dynamic web pages.", badge: 'ASP.NET', level: 'Intermediate', done: false },
    { question: "What is React Native?", answer: "React Native is an open-source mobile application framework created by Facebook.", badge: 'React Native', level: 'Beginner', done: false },
    { question: "What is Flutter?", answer: "Flutter is an open-source UI software development kit created by Google.", badge: 'Flutter', level: 'Intermediate', done: false },
    { question: "What is Ionic?", answer: "Ionic is a complete open-source SDK for hybrid mobile app development.", badge: 'Ionic', level: 'Beginner', done: false },

    // Algorithms & Data Structures
    { question: "What is Binary Search?", answer: "Binary Search is a search algorithm that finds the position of a target value within a sorted array.", badge: 'Binary Search', level: 'Beginner', done: false },
    { question: "What is Quick Sort?", answer: "Quick Sort is an efficient sorting algorithm that uses a divide-and-conquer approach.", badge: 'Quick Sort', level: 'Intermediate', done: false },
    { question: "What is Merge Sort?", answer: "Merge Sort is a stable, comparison-based, divide-and-conquer sorting algorithm.", badge: 'Merge Sort', level: 'Intermediate', done: false },
    { question: "What is Dynamic Programming?", answer: "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.", badge: 'Dynamic Programming', level: 'Advanced', done: false },
    { question: "What are Graph Algorithms?", answer: "Graph Algorithms are a set of instructions that traverse (visits nodes of) a graph.", badge: 'Graph Algorithms', level: 'Advanced', done: false },
    { question: "What is Tree Traversal?", answer: "Tree Traversal is a process of visiting all the nodes in a tree data structure.", badge: 'Tree Traversal', level: 'Beginner', done: false },
    { question: "What is Hashing?", answer: "Hashing is the process of converting an input of any length into a fixed size string of text.", badge: 'Hashing', level: 'Intermediate', done: false },
    { question: "What is Recursion?", answer: "Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.", badge: 'Recursion', level: 'Beginner', done: false },

    // System Design & Architecture
    { question: "What are Microservices?", answer: "Microservices are an architectural style that structures an application as a collection of loosely coupled services.", badge: 'Microservices', level: 'Advanced', done: false },
    { question: "What is Monolithic Architecture?", answer: "Monolithic Architecture is a traditional model of software design where all the components of the application are combined into a single program.", badge: 'Monolithic Architecture', level: 'Beginner', done: false },
    { question: "What is Load Balancing?", answer: "Load Balancing is the process of distributing network traffic across multiple servers.", badge: 'Load Balancing', level: 'Intermediate', done: false },
    { question: "What is Caching?", answer: "Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.", badge: 'Caching', level: 'Beginner', done: false },
    { question: "What is Database Sharding?", answer: "Database Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.", badge: 'Database Sharding', level: 'Advanced', done: false },
    { question: "What is CAP Theorem?", answer: "CAP Theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.", badge: 'CAP Theorem', level: 'Intermediate', done: false },
    { question: "What are Message Queues?", answer: "Message Queues are a form of asynchronous service-to-service communication used in serverless and microservices architectures.", badge: 'Message Queues', level: 'Intermediate', done: false },
    { question: "What is an API Gateway?", answer: "An API Gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.", badge: 'API Gateway', level: 'Advanced', done: false },

    // Data Science & ML
    { question: "What is Linear Regression?", answer: "Linear Regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables.", badge: 'Linear Regression', level: 'Beginner', done: false },
    { question: "What is Logistic Regression?", answer: "Logistic Regression is a statistical method for analyzing a dataset in which there are one or more independent variables that determine an outcome.", badge: 'Logistic Regression', level: 'Intermediate', done: false },
    { question: "What are Decision Trees?", answer: "Decision Trees are a non-parametric supervised learning method used for classification and regression.", badge: 'Decision Trees', level: 'Beginner', done: false },
    { question: "What are Random Forests?", answer: "Random Forests are an ensemble learning method for classification, regression, and other tasks that operate by constructing a multitude of decision trees.", badge: 'Random Forests', level: 'Intermediate', done: false },
    { question: "What are Support Vector Machines?", answer: "Support Vector Machines are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis.", badge: 'Support Vector Machines', level: 'Advanced', done: false },
    { question: "What are Neural Networks?", answer: "Neural Networks are a series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.", badge: 'Neural Networks', level: 'Advanced', done: false },
    { question: "What is K-Means Clustering?", answer: "K-Means Clustering is a method of vector quantization, originally from signal processing, that is popular for cluster analysis in data mining.", badge: 'K-Means Clustering', level: 'Intermediate', done: false },
    { question: "What is Principal Component Analysis?", answer: "Principal Component Analysis is a technique for reducing the dimensionality of such datasets, increasing interpretability but at the same time minimizing information loss.", badge: 'Principal Component Analysis', level: 'Advanced', done: false },
    // Full-Stack, Web & Mobile
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces.", badge: 'React', level: 'Beginner', done: false },
    { question: "What is Angular?", answer: "Angular is a platform for building mobile and desktop web applications.", badge: 'Angular', level: 'Intermediate', done: false },
    { question: "What is Vue?", answer: "Vue is a progressive framework for building user interfaces.", badge: 'Vue', level: 'Beginner', done: false },
    { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.", badge: 'Node.js', level: 'Intermediate', done: false },
    { question: "What is Express?", answer: "Express is a minimal and flexible Node.js web application framework.", badge: 'Express', level: 'Intermediate', done: false },
    { question: "What is Django?", answer: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.", badge: 'Django', level: 'Advanced', done: false },
    { question: "What is Flask?", answer: "Flask is a micro web framework written in Python.", badge: 'Flask', level: 'Beginner', done: false },
    { question: "What is Spring Boot?", answer: "Spring Boot is an open source Java-based framework used to create a micro Service.", badge: 'Spring Boot', level: 'Intermediate', done: false },
    { question: "What is Ruby on Rails?", answer: "Ruby on Rails is a server-side web application framework written in Ruby.", badge: 'Ruby on Rails', level: 'Advanced', done: false },
    { question: "What is ASP.NET?", answer: "ASP.NET is an open-source, server-side web-application framework designed for web development to produce dynamic web pages.", badge: 'ASP.NET', level: 'Intermediate', done: false },
    { question: "What is React Native?", answer: "React Native is an open-source mobile application framework created by Facebook.", badge: 'React Native', level: 'Beginner', done: false },
    { question: "What is Flutter?", answer: "Flutter is an open-source UI software development kit created by Google.", badge: 'Flutter', level: 'Intermediate', done: false },
    { question: "What is Ionic?", answer: "Ionic is a complete open-source SDK for hybrid mobile app development.", badge: 'Ionic', level: 'Beginner', done: false },

    // Algorithms & Data Structures
    { question: "What is Binary Search?", answer: "Binary Search is a search algorithm that finds the position of a target value within a sorted array.", badge: 'Binary Search', level: 'Beginner', done: false },
    { question: "What is Quick Sort?", answer: "Quick Sort is an efficient sorting algorithm that uses a divide-and-conquer approach.", badge: 'Quick Sort', level: 'Intermediate', done: false },
    { question: "What is Merge Sort?", answer: "Merge Sort is a stable, comparison-based, divide-and-conquer sorting algorithm.", badge: 'Merge Sort', level: 'Intermediate', done: false },
    { question: "What is Dynamic Programming?", answer: "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.", badge: 'Dynamic Programming', level: 'Advanced', done: false },
    { question: "What are Graph Algorithms?", answer: "Graph Algorithms are a set of instructions that traverse (visits nodes of) a graph.", badge: 'Graph Algorithms', level: 'Advanced', done: false },
    { question: "What is Tree Traversal?", answer: "Tree Traversal is a process of visiting all the nodes in a tree data structure.", badge: 'Tree Traversal', level: 'Beginner', done: false },
    { question: "What is Hashing?", answer: "Hashing is the process of converting an input of any length into a fixed size string of text.", badge: 'Hashing', level: 'Intermediate', done: false },
    { question: "What is Recursion?", answer: "Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.", badge: 'Recursion', level: 'Beginner', done: false },

    // System Design & Architecture
    { question: "What are Microservices?", answer: "Microservices are an architectural style that structures an application as a collection of loosely coupled services.", badge: 'Microservices', level: 'Advanced', done: false },
    { question: "What is Monolithic Architecture?", answer: "Monolithic Architecture is a traditional model of software design where all the components of the application are combined into a single program.", badge: 'Monolithic Architecture', level: 'Beginner', done: false },
    { question: "What is Load Balancing?", answer: "Load Balancing is the process of distributing network traffic across multiple servers.", badge: 'Load Balancing', level: 'Intermediate', done: false },
    { question: "What is Caching?", answer: "Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.", badge: 'Caching', level: 'Beginner', done: false },
    { question: "What is Database Sharding?", answer: "Database Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.", badge: 'Database Sharding', level: 'Advanced', done: false },
    { question: "What is CAP Theorem?", answer: "CAP Theorem states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance.", badge: 'CAP Theorem', level: 'Intermediate', done: false },
    { question: "What are Message Queues?", answer: "Message Queues are a form of asynchronous service-to-service communication used in serverless and microservices architectures.", badge: 'Message Queues', level: 'Intermediate', done: false },
    { question: "What is an API Gateway?", answer: "An API Gateway is a server that acts as an API front-end, receiving API requests, enforcing throttling and security policies, passing requests to the back-end service, and then passing the response back to the requester.", badge: 'API Gateway', level: 'Advanced', done: false },

    // Data Science & ML
    { question: "What is Linear Regression?", answer: "Linear Regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables.", badge: 'Linear Regression', level: 'Beginner', done: false },
    { question: "What is Logistic Regression?", answer: "Logistic Regression is a statistical method for analyzing a dataset in which there are one or more independent variables that determine an outcome.", badge: 'Logistic Regression', level: 'Intermediate', done: false },
    { question: "What are Decision Trees?", answer: "Decision Trees are a non-parametric supervised learning method used for classification and regression.", badge: 'Decision Trees', level: 'Beginner', done: false },
    { question: "What are Random Forests?", answer: "Random Forests are an ensemble learning method for classification, regression, and other tasks that operate by constructing a multitude of decision trees.", badge: 'Random Forests', level: 'Intermediate', done: false },
    { question: "What are Support Vector Machines?", answer: "Support Vector Machines are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis.", badge: 'Support Vector Machines', level: 'Advanced', done: false },
    { question: "What are Neural Networks?", answer: "Neural Networks are a series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.", badge: 'Neural Networks', level: 'Advanced', done: false },
    { question: "What is K-Means Clustering?", answer: "K-Means Clustering is a method of vector quantization, originally from signal processing, that is popular for cluster analysis in data mining.", badge: 'K-Means Clustering', level: 'Intermediate', done: false },
    { question: "What is Principal Component Analysis?", answer: "Principal Component Analysis is a technique for reducing the dimensionality of such datasets, increasing interpretability but at the same time minimizing information loss.", badge: 'Principal Component Analysis', level: 'Advanced', done: false }
];