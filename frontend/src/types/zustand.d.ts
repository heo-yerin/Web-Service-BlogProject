interface User{
  email: string; // 이메일
  username: string;  // 이름
}

interface AuthStore{
  user: User| null;  // 로그인한사용자정보(로그인하지않은경우null)
  accessToken: string | null;  // 현재사용중인Access Token (로그인하지않은경우null)
  setAuth: (user: User, accessToken: string) => void;   // 사용자정보및Access Token 저장하는함수(로그인시)
  unsetAuth: () => void;  // 사용자정보와토큰을초기화하는함수(로그아웃시)
}
