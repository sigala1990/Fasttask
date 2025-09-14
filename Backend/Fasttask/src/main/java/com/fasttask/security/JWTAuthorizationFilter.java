package com.fasttask.security;

import static com.fasttask.security.Constants.HEADER_AUTHORIZACION_KEY;
import static com.fasttask.security.Constants.SUPER_SECRET_KEY;
import static com.fasttask.security.Constants.TOKEN_BEARER_PREFIX;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	public JWTAuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}



	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		String header = req.getHeader(HEADER_AUTHORIZACION_KEY);
		if (header == null || !header.startsWith(TOKEN_BEARER_PREFIX)) {
			chain.doFilter(req, res);
			return;
		}
		UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(req, res);

	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_AUTHORIZACION_KEY);

		if (token != null) {
			// Se procesa el token y se recupera el usuario.
			Claims claims = Jwts.parser().setSigningKey(SUPER_SECRET_KEY)
					.parseClaimsJws(token.replace(TOKEN_BEARER_PREFIX, "")).getBody();
			
			String user = claims.getSubject();
			if (user != null) {
//				System.out.println("AUTHORIZATION");

				  Collection<SimpleGrantedAuthority> authorities =
	                        Arrays.stream(claims.get("roles").toString().split(","))
	                                .map(SimpleGrantedAuthority::new)
	                                .collect(Collectors.toList());
//				System.out.println(user);
				
				return new UsernamePasswordAuthenticationToken(user, null, authorities);// tocar
			
			}
			return null;
		}
		return null;
	}
}