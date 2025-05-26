📂 src
├── 📂 modules                      # Các domain/module chính của app
│   ├── 📂 user                     # Ví dụ: module User
│   │   ├── 📂 dto                  # DTOs cho user
│   │   ├── 📂 entities             # Entity cho user (TypeORM/Prisma)
│   │   ├── 📂 interfaces           # Interface cho user
│   │   ├── 📂 services             # Service logic
│   │   ├── 📂 controllers          # Controllers
│   │   ├── 📂 repositories         # Custom repository pattern
│   │   └── user.module.ts
│   └── 📂 auth                     # Module Auth (xác thực)
│       ├── ...
├── 📂 common                       # Mã dùng chung (decorators, filters, interceptors, utils, pipes, etc.)
│   ├── 📂 decorators
│   ├── 📂 exceptions
│   ├── 📂 filters
│   ├── 📂 guards
│   ├── 📂 interceptors
│   ├── 📂 pipes
│   └── 📂 utils
├── 📂 config                       # Cấu hình toàn cục (env, database, auth, etc.)
│   ├── 📄 app.config.ts
│   ├── 📄 database.config.ts
│   ├── 📄 jwt.config.ts
│   └── 📄 config.module.ts
├── 📂 infrastructure               # Lớp hạ tầng (DB, cache, message brokers)
│   ├── 📂 database                 # ORM setup (TypeORM/Prisma)
│   ├── 📂 redis                    # Redis setup (nếu có)
│   └── 📂 queues                   # Queues (Bull, RabbitMQ)
├── 📂 shared                       # Các thành phần chia sẻ (constants, types, enums)
│   ├── 📂 constants
│   ├── 📂 enums
│   └── 📂 types
├── 📂 main.ts                      # File bootstrap khởi chạy app
├── 📂 app.module.ts                # Module gốc
└── 📂 app.controller.ts            # Controller gốc (nếu cần)

📂 test                             # Test cho từng module
├── 📂 user
│   └── user.service.spec.ts
└── 📂 auth
    └── auth.service.spec.ts

📄 .env                             # Biến môi trường
📄 nest-cli.json                    # Cấu hình Nest CLI
📄 tsconfig.json                    # Cấu hình TypeScript
📄 package.json
