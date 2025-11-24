import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class ExpenseQuery implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const supportedCategories = ['shopping', 'food', 'gym', 'electronics'];
        if('category' in value && !supportedCategories.includes(value.category)){
            throw new BadRequestException('wront category provided')
        }


        if('priceFrom' in value && isNaN(value.priceFrom)){
            throw new BadRequestException('Wrong priceFrom provided')
        }

        if('priceFrom' in value){
            value.priceFrom = Number(value.priceFrom)
        }

        if('priceTo' in value && isNaN(value.priceTo)){
            throw new BadRequestException('Wrong priceTo provided')
        }

        if('priceTo' in value){
            value.priceTo = Number(value.priceTo)
        }

        return value
    }
}