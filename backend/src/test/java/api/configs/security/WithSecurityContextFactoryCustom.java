package api.configs.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import api.configs.security.annotations.WithUserDetailsCustom;
import api.models.entities.User;

public class WithSecurityContextFactoryCustom implements WithSecurityContextFactory<WithUserDetailsCustom> {

    @Override
    public SecurityContext createSecurityContext(WithUserDetailsCustom annotation) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        User principal = User.builder()
                .id(annotation.id())
                .username(annotation.value())
                .password(annotation.password())
                .role(annotation.role())
                .build();
        Authentication auth = new UsernamePasswordAuthenticationToken(principal, "password",
                principal.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }

}
