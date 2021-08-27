use anchor_lang::prelude::*;

#[program]
pub mod test {
    use super::*;

    pub fn initialize_v1(ctx: Context<InitializeV1>) -> ProgramResult {
        let test_acc = &mut ctx.accounts.test_acc;
        test_acc.data = 100;
        Ok(())
    }

    pub fn initialize_v2(ctx: Context<InitializeV2>) -> ProgramResult {
        let mut remaining_accs =
            Remaining::try_accounts(ctx.program_id, &mut &ctx.remaining_accounts[..], &[])?;

        let test_acc = &mut remaining_accs.test_acc;
        test_acc.data = 100;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeV1<'info> {
    #[account(init)]
    pub test_acc: ProgramAccount<'info, TestAccount>,
}

#[derive(Accounts)]
pub struct InitializeV2 {}

#[derive(Accounts)]
pub struct Remaining<'info> {
    #[account(init)]
    pub test_acc: ProgramAccount<'info, TestAccount>,
}

#[account]
pub struct TestAccount {
    pub data: u64,
}
