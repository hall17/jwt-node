# Features

1. login/logout/register + session expirt
2. email verification ("Confirm your email")
3. password reset ("Forgot password")
4. password confirmation ("Re-enter your password")
5. persistent login ("Remember me")
6. account lockout ("Too many failed login attempts")
7. rate limiting ("Too many requests")

# Theory

1. Authentication
- verifying user identity
- public(username/email) + private(password,token,2FA) info

2. Session Management
- HTTP is a statless protocol; each req is self-contained
- sessions used to retain user state between requests
- session cookie ties a req to the user's session

3. Session Timeout
- idle/inactivity: sliding expiration, resets on each req
- absolute: fixed expiration, max duration of lifetime
- renewal: interval until session ID is regenerated


docker exec -it ex3-code-realm-db-1 mongo -u admin -p secret auth