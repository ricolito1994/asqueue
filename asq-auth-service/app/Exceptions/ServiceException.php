<?php
namespace App\Exceptions;
use Exception;
use Throwable;

class ServiceException extends Exception 
{
    protected array $errors;

    public function __construct(
        array $errors,
        int|string $errorCode = 500,
        string $errorMessage = "Service Exception", 
        ?Throwable $previous = null // exception chain
    )
    {
        parent::__construct($errorMessage, $errorCode, $previous);
        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function toArray (): array 
    {
        return [
            'message' => $this->getMessage(),
            'code' => $this->getCode(),
            'errors' => $this->errors
        ];
    }

}