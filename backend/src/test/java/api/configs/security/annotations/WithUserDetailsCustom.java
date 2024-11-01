package api.configs.security.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.test.context.support.WithSecurityContext;

import api.configs.security.WithSecurityContextFactoryCustom;
import api.models.enums.UserRole;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithSecurityContextFactoryCustom.class)
public @interface WithUserDetailsCustom {
    int id() default 123;

    String value() default "user";

    String password() default "password";

    UserRole role() default UserRole.USER;
}
