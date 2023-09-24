import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { KeywordsDto } from 'src/media/dto/keywords.dto';
export declare class ParseKeywordsDtoPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): KeywordsDto;
}
