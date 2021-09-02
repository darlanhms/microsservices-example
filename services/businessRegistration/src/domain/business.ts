import {
    AggregateRoot,
    Either,
    GenericAppError,
    GenericErrors,
    Guard,
    left,
    right,
    UniqueEntityID,
} from '@microsservices-example/shared';

interface IBusinessProps {
    name: string;
    description: string;
    slug: string;
    slogan?: string;
}

export default class Business extends AggregateRoot<IBusinessProps> {
    constructor(props: IBusinessProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get slug(): string {
        return this.props.slug;
    }

    get slogan(): string | undefined {
        return this.props.slogan;
    }

    public static create(props: IBusinessProps, id?: UniqueEntityID): Either<GenericAppError, Business> {
        const guardedProps = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'nome' },
            { argument: props.description, argumentName: 'descrição' },
            { argument: props.slug, argumentName: 'slug' },
        ]);

        if (!guardedProps.succeeded) {
            return left(new GenericErrors.InvalidParam(guardedProps.message));
        }

        return right(new Business(props, id));
    }
}
