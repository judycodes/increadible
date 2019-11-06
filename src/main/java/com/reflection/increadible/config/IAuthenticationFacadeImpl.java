package com.reflection.increadible.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class IAuthenticationFacadeImpl implements IAuthenticationFacade {

    @Override
    public Authentication getAuthentication() {

        return SecurityContextHolder.getContext().getAuthentication();

    }
}
