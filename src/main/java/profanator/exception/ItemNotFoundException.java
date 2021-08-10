package profanator.exception;

public class ItemNotFoundException extends RuntimeException {

    private final String item;

    public ItemNotFoundException(String item) {
        this.item = item;
    }

    @Override
    public String getMessage() {
        return String.format("The item '%s' was not found.", item);
    }

}
