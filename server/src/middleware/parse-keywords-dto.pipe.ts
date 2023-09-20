import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { KeywordsDto } from 'src/media/dto/keywords.dto';

@Injectable()
export class ParseKeywordsDtoPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata){
        // let keywords: KeywordsDto = new KeywordsDto();
        // keywords.keywords = value.split('*');
        // return keywords;

        return new KeywordsDto(value.split('*'));
    }
}