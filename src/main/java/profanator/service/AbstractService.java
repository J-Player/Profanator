package profanator.service;

abstract class AbstractService<T, Id> {

    public abstract void deleteById(Id id);

    public abstract void delete(T t);

    public abstract void update(T t);

}
