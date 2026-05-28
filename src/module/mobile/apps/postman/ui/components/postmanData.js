const MOCK_COLLECTIONS = [
  {
    name: "User API",
    requests: [
      { id: "req_profile", name: "Get Profile", method: "GET", url: "https://api.dev/v1/profile", body: "" },
      { id: "req_login", name: "User Login", method: "POST", url: "https://api.dev/v1/login", body: '{\n  "username": "guest",\n  "password": "password123"\n}' }
    ]
  },
  {
    name: "Portfolio API",
    requests: [
      { id: "req_projects", name: "List Projects", method: "GET", url: "https://api.dev/v1/projects", body: "" },
      { id: "req_contact", name: "Send Contact Message", method: "POST", url: "https://api.dev/v1/contact", body: '{\n  "name": "Anonymous Dev",\n  "email": "dev@example.com",\n  "message": "Love your macOS portfolio!"\n}' }
    ]
  }
];

export default MOCK_COLLECTIONS;
