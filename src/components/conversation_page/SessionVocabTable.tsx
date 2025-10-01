import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { SessionVocabTable } from "@/utils/conversationData/types";

export default function SessionVocabTable({ vocab, index }: SessionVocabTable) {
  return (
    <Table
      key={`vocab-${index}`}
      className="border-primary-200 dark:border-primary-900 w-full border-2"
    >
      <TableBody>
        {/* WORD */}
        <TableRow>
          <TableCell className="bg-blue-400">Word</TableCell>
          <TableCell>{vocab.vocab}</TableCell>
        </TableRow>
        {/* MEANING */}
        <TableRow>
          <TableCell className="bg-blue-400">Meaning</TableCell>
          <TableCell>
            <ul>
              {vocab.meaning.map((meaning, index) => (
                <li key={`meaning-${index}`} className="space-y-1">
                  {meaning}
                </li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
        {/* PART OF SPEECH */}
        <TableRow>
          <TableCell className="bg-blue-400">Part of Speech</TableCell>
          <TableCell>{vocab.part_of_speech}</TableCell>
        </TableRow>
        {/* TONE */}
        <TableRow>
          <TableCell className="bg-blue-400">Tone</TableCell>
          <TableCell>{vocab.tone}</TableCell>
        </TableRow>
        {/* EXAMPLES */}
        <TableRow>
          <TableCell className="bg-blue-400">Examples</TableCell>
          <TableCell>
            <Table className="space-y-10">
              <TableBody className="space-y-6">
                {vocab.examples.map((example, index) => (
                  <TableRow key={`example-${index}`} className="space-y-1">
                    <TableCell>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Sentence
                            </TableCell>
                            <TableCell>{example.sentence}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Translation
                            </TableCell>
                            <TableCell>{example.translation}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
        {/* IDIOMS */}
        <TableRow>
          <TableCell className="bg-blue-400">Idioms</TableCell>
          <TableCell>
            <Table className="space-y-10">
              <TableBody className="space-y-6">
                {vocab.idioms.map((idiom, index) => (
                  <TableRow key={`idiom-${index}`} className="space-y-1">
                    <TableCell>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Idiom
                            </TableCell>
                            <TableCell>{idiom.phrase}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Meaning
                            </TableCell>
                            <TableCell>{idiom.meaning}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
        {/* REGIONAL VARIATIONS */}
        <TableRow>
          <TableCell className="bg-blue-400">Regional variations</TableCell>
          <TableCell>
            <Table className="space-y-10">
              <TableBody className="space-y-6">
                {vocab.regional_variations.map((variation, index) => (
                  <TableRow key={`variation-${index}`} className="space-y-1">
                    <TableCell>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Country
                            </TableCell>
                            <TableCell>{variation.country}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Word
                            </TableCell>
                            <TableCell>{variation.word}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Part of speech
                            </TableCell>
                            <TableCell>{variation.part_of_speech}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Meaning
                            </TableCell>
                            <TableCell>{variation.meaning}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Example Sentence
                            </TableCell>
                            <TableCell>{variation.example.sentence}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="bg-secondary-500">
                              Translation
                            </TableCell>
                            <TableCell>
                              {variation.example.translation}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
        {/* SYNONYMS */}
        <TableRow>
          <TableCell className="bg-blue-400">Synonyms</TableCell>
          <TableCell>
            <ul>
              {vocab.synonyms.map((synonym, index) => (
                <li key={`synonym-${index}`}>{synonym}</li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
        {/* ANTONYMS */}
        <TableRow>
          <TableCell className="bg-blue-400">Antonyms</TableCell>
          <TableCell>
            <ul>
              {vocab.antonyms.map((antonym, index) => (
                <li key={`antonym-${index}`}>{antonym}</li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
