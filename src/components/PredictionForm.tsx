import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Select, 
  Flex, 
  Heading, 
  Text, 
  Alert, 
  AlertIcon, 
  Stack, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper 
} from "@chakra-ui/react";
import { PredictionParams, areaOptions, cropOptions, useCropYieldPredictor } from '../lib/model';

export default function PredictionForm() {
  const [params, setParams] = useState<PredictionParams>({
    year: new Date().getFullYear(),
    rainfall: 1000,
    pesticides: 500,
    temperature: 20,
    area: 'India',
    crop: 'Maize'
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { predictYield } = useCropYieldPredictor();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'rainfall' || name === 'pesticides' || name === 'temperature' 
        ? parseFloat(value) 
        : value
    }));
  };

  const handleNumberInputChange = (name: string, value: string) => {
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await predictYield(params);
      setPrediction(result);
    } catch (err) {
      setError('Failed to predict crop yield. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="md" maxW="800px" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="green.600">
        Crop Yield Prediction
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Flex gap={4} flexWrap="wrap">
            <FormControl flex="1" minW="200px">
              <FormLabel>Year</FormLabel>
              <NumberInput 
                min={1990} 
                max={2030} 
                value={params.year}
                onChange={(value) => handleNumberInputChange('year', value)}
              >
                <NumberInputField name="year" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl flex="1" minW="200px">
              <FormLabel>Average Rainfall (mm/year)</FormLabel>
              <NumberInput 
                min={0} 
                max={5000} 
                value={params.rainfall}
                onChange={(value) => handleNumberInputChange('rainfall', value)}
              >
                <NumberInputField name="rainfall" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          
          <Flex gap={4} flexWrap="wrap">
            <FormControl flex="1" minW="200px">
              <FormLabel>Pesticides (tonnes)</FormLabel>
              <NumberInput 
                min={0} 
                max={10000} 
                value={params.pesticides}
                onChange={(value) => handleNumberInputChange('pesticides', value)}
              >
                <NumberInputField name="pesticides" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            
            <FormControl flex="1" minW="200px">
              <FormLabel>Average Temperature (°C)</FormLabel>
              <NumberInput 
                min={-10} 
                max={40} 
                step={0.1} 
                value={params.temperature}
                onChange={(value) => handleNumberInputChange('temperature', value)}
              >
                <NumberInputField name="temperature" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          
          <Flex gap={4} flexWrap="wrap">
            <FormControl flex="1" minW="200px">
              <FormLabel>Country/Area</FormLabel>
              <Select
                name="area"
                value={params.area}
                onChange={handleChange}
              >
                {areaOptions.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </Select>
            </FormControl>
            
            <FormControl flex="1" minW="200px">
              <FormLabel>Crop Type</FormLabel>
              <Select
                name="crop"
                value={params.crop}
                onChange={handleChange}
              >
                {cropOptions.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          
          <Button 
            type="submit" 
            colorScheme="green" 
            mt={4} 
            w="full"
            isLoading={isLoading}
            loadingText="Predicting..."
          >
            Predict Yield
          </Button>
        </Stack>
      </form>
      
      {error && (
        <Alert status="error" mt={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      {prediction !== null && !isLoading && !error && (
        <Box mt={6} p={5} bg="green.50" borderRadius="md">
          <Heading as="h3" size="md" color="green.700" mb={2}>Prediction Result</Heading>
          <Text fontSize="xl" fontWeight="bold">
            Estimated Yield: {prediction.toLocaleString()} hg/ha
          </Text>
          <Text fontSize="sm" color="gray.600" mt={2}>
            Note: This prediction is based on historical data and environmental factors.
            Actual yields may vary based on additional factors not included in this model.
          </Text>
        </Box>
      )}
    </Box>
  );
}