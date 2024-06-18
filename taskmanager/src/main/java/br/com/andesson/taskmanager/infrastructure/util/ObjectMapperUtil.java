package br.com.andesson.taskmanager.infrastructure.util;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;

/**
 * Utility component for object mapping.
 */
@Component
public class ObjectMapperUtil {

    private static final ModelMapper MODEL_MAPPER;

    static {
        MODEL_MAPPER = new ModelMapper();
    }

    /**
     * Maps an input object to an instance of the specified class.
     *
     * @param object The object to be mapped to Class<T>.
     * @param clazz The target class type.
     * @param <Input> The input type.
     * @param <Output> The output type.
     * @return An instance of clazz with data from the object.
     */
    public <Input, Output> Output map(final Input object, final Class<Output> clazz) {
        MODEL_MAPPER.getConfiguration()
                .setAmbiguityIgnored(true)
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);

        return MODEL_MAPPER.map(object, clazz);
    }

    /**
     * Copies data from a source object to a target object.
     *
     * @param source The source object.
     * @param target The target object.
     * @param <Source> The source type.
     * @param <Target> The target type.
     * @return An instance of the target object with data from the source object.
     */
    public <Source, Target> Target map(final Source source, Target target) {
        try {
            for (Field sourceField : source.getClass().getDeclaredFields()) {
                boolean fieldExists = Arrays.stream(target.getClass().getDeclaredFields())
                        .anyMatch(f -> f.getName().equals(sourceField.getName()));

                if (!fieldExists)
                    continue;

                Field targetField = target.getClass().getDeclaredField(sourceField.getName());
                sourceField.setAccessible(true);
                targetField.setAccessible(true);

                if (isRecord(sourceField.getType())) {
                    Object sourceAggregateObject = sourceField.get(source);
                    Object targetAggregateObject = targetField.getType().getDeclaredConstructor().newInstance();
                    targetField.set(target, map(sourceAggregateObject, targetAggregateObject));
                    continue;
                }

                Object value = sourceField.get(source);
                targetField.set(target, value);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return target;
    }

    /**
     * Checks if a class is a record.
     *
     * @param clazz The class to be checked.
     * @return 'true' if the class is a record, 'false' otherwise.
     */
    private boolean isRecord(Class<?> clazz) {
        return clazz.isRecord();
    }

    /**
     * Converts an object of one type to another in a functional context.
     *
     * @param clazz The type to which the object will be converted.
     * @param <Input> The input type.
     * @param <Output> The output type.
     * @return An instance of clazz with data from the input object.
     */
    public <Input, Output> Function<Input, Output> mapFn(final Class<Output> clazz) {
        return object -> MODEL_MAPPER.map(object, clazz);
    }

    /**
     * Converts a list of objects from one type to a list of Class<T> objects.
     *
     * @param objectList The list of objects to be converted.
     * @param clazz The target class type.
     * @param <Input> The input type.
     * @param <Output> The output type.
     * @return A list of objectList converted to the clazz type.
     */
    public <Input, Output> List<Output> mapAll(final Collection<Input> objectList, Class<Output> clazz) {
        MODEL_MAPPER.getConfiguration()
                .setAmbiguityIgnored(true)
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(Configuration.AccessLevel.PRIVATE);

        return objectList.stream()
                .map(obj -> MODEL_MAPPER.map(obj, clazz))
                .toList();
    }

    /**
     * Converts a list of objects from one type to a list of Class<T> objects in a functional context.
     *
     * @param clazz The type to which the list will be converted.
     * @param <Input> The input type.
     * @param <Output> The output type.
     * @return A list of Class<T>.
     */
    public <Input, Output> Function<List<Input>, List<Output>> mapAllFn(final Class<Output> clazz) {
        return objectList -> objectList.stream()
                .map(object -> MODEL_MAPPER.map(object, clazz))
                .toList();
    }
}
