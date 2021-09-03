import {
    Either,
    Entity,
    GenericAppError,
    GenericErrors,
    Guard,
    left,
    right,
    UniqueEntityID,
} from '@microsservices-example/shared';

interface IBusinessProps {
    slug: string;
}

export default class Business extends Entity<IBusinessProps> {
    constructor(props: IBusinessProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get slug(): string {
        return this.props.slug;
    }

    public static create(props: IBusinessProps, id?: UniqueEntityID): Either<GenericAppError, Business> {
        const guardedProps = Guard.againstNullOrUndefinedBulk([{ argument: props.slug, argumentName: 'slug' }]);

        if (!guardedProps.succeeded) {
            return left(new GenericErrors.InvalidParam(guardedProps.message));
        }

        return right(new Business(props, id));
    }
}
