package com.fasttask.security;

import static com.fasttask.security.Constants.LOGIN_URL;
import static com.fasttask.security.Constants.SWAGGER_API_DOCS;
import static com.fasttask.security.Constants.SWAGGER_RESOURCES;
import static com.fasttask.security.Constants.SWAGGER_UI;
import static com.fasttask.security.Constants.SWAGGER_UI_HTML;
import static com.fasttask.security.Constants.SWAGGER_WEBJARS;

import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public WebSecurity(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
	    this.userDetailsService = userDetailsService;
	    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	private UserDetailsService userDetailsService;
	private Filter simpleCorsFilter;

	@Autowired
	public SimpleCORSFilter myCorsFilter;
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.cors().and()
			.csrf().disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.POST,"/fasttask"+ LOGIN_URL).permitAll()
			.antMatchers(SWAGGER_RESOURCES).permitAll()
			.antMatchers(SWAGGER_UI_HTML).permitAll()
			.antMatchers(SWAGGER_API_DOCS).permitAll()
			.antMatchers(SWAGGER_UI).permitAll()
			.antMatchers(SWAGGER_WEBJARS).permitAll()
			.anyRequest().authenticated()
//			.anyRequest().hasAuthority("ROLE_ADMIN")
			.and()
				.addFilter(new JWTAuthenticationFilter(authenticationManager()))
				.addFilter(new JWTAuthorizationFilter(authenticationManager()));
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		// Se define la clase que recupera los usuarios y el algoritmo para procesar las passwords
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS", "PUT", "DELETE"));
		//corsConfiguration.setAllowedOrigins(Arrays.asList( "http://localhost:4200/signin","http://217.154.179.4","http://adriaqf.es","http://217.154.179.4/fasttask/", "http://217.154.179.4/fasttask"));
		corsConfiguration.setAllowedOrigins(Arrays.asList( "http://localhost:4200", "https://adriaqf.es",
		        "https://www.adriaqf.es"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues().combine(corsConfiguration));
		return source;
	}
}
