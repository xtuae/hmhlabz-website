
async function runTest() {
  const url = 'https://api.hmhlabz.com/api/about';
  
  console.log('1. Fetching current About content...');
  const getRes = await fetch(url);
  if (!getRes.ok) {
    throw new Error(`Failed to GET about: ${getRes.statusText}`);
  }
  const originalData = await getRes.json();
  console.log('GET successful. Current thesis title:', originalData.thesisTitle);

  console.log('\n2. Modifying thesis title and performing PUT request...');
  const updatedData = {
    ...originalData,
    thesisTitle: '01 · Our Core Thesis'
  };
  
  // Remove metadata fields that Prisma doesn't expect or shouldn't update manually if not needed,
  // although Prisma upsert will handle them or ignore.
  delete updatedData.updatedAt;

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });

  if (!putRes.ok) {
    throw new Error(`Failed to PUT about: ${putRes.statusText}`);
  }
  
  const putResult = await putRes.json();
  console.log('PUT successful. Returned thesis title:', putResult.thesisTitle);

  console.log('\n3. Verifying update with another GET request...');
  const verifyRes = await fetch(url);
  if (!verifyRes.ok) {
    throw new Error(`Failed to verify GET about: ${verifyRes.statusText}`);
  }
  const verifiedData = await verifyRes.json();
  console.log('Verify GET successful. Verified thesis title:', verifiedData.thesisTitle);
  
  if (verifiedData.thesisTitle !== '01 · Our Core Thesis') {
    throw new Error('Verification failed: Thesis title did not update correctly in DB.');
  }
  console.log('✅ Assert passed: Thesis title updated successfully.');

  console.log('\n4. Restoring original thesis title...');
  const restoreData = {
    ...originalData,
    thesisTitle: originalData.thesisTitle
  };
  delete restoreData.updatedAt;

  const restoreRes = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restoreData)
  });
  
  if (!restoreRes.ok) {
    throw new Error(`Failed to restore about: ${restoreRes.statusText}`);
  }
  console.log('✅ Successfully restored original data.');
}

runTest().catch(console.error);
