class User:
    users = []  # Mock storage

    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role

    @classmethod
    def find_by_username(cls, username):
        for user in cls.users:
            if user.username == username:
                return user
        return None

    def save(self):
        self.users.append(self)